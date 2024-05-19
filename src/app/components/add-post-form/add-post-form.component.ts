import { Component } from '@angular/core';
import { Category } from '../../data/category';
import { CategoryService } from '../../service/category.service';
import { PostService } from '../../service/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { PostCreateInput } from '../../data/post';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrl: './add-post-form.component.css'
})
export class AddPostFormComponent {
  categories: Category[] = [];

  add_post_form = this.fb.group({
    title: [
      '',
      {
        validators: [Validators.required, Validators.minLength(5) ,Validators.maxLength(150)],
        updateOn: 'blur'
      }
    ],
    categoryId: [
      '',
      {
        validators: [Validators.required],
        updateOn: 'blur'
      }
    ],
    content: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(2500)],
        updateOn: 'blur'
      }
    ]
});

	Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
		toast.onmouseenter = Swal.stopTimer;
		toast.onmouseleave = Swal.resumeTimer;
		}
	});

  constructor(private categoryService: CategoryService, private postService: PostService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
      this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  get title() {
    return this.add_post_form.controls['title'];
  }

  get categoryId() {
    return this.add_post_form.controls['categoryId'];
  }

  get content() {
    return this.add_post_form.controls['content'];
  }

  goToHomePage(): void {
	this.router.navigate(['home']);
  }

	onSubmit(): void {
	if (this.add_post_form.valid) {
		const observer: Observer<any> = {
			next: (response) => {
				console.log("Formulaire soumis avec succès!", response);
			},
			error: (err) => {
				console.error("Erreur lors de la soumission du formulaire", err);
			},
			complete: () => {
				this.Toast.fire({
				icon: "success",
				title: "Post Submitted Successfully"
				});
				this.goToHomePage();
			}
		};
		this.postService.createPost(this.add_post_form.value as PostCreateInput).subscribe(observer);
    } else {
		this.Toast.fire({
			icon: "error",
			title: "Please review your post"
			});
		}
	};   
}