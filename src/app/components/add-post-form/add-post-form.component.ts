import { Component } from '@angular/core';
import { Category } from '../../data/category';
import { CategoryService } from '../../service/category.service';
import { PostService } from '../../service/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { PostCreateInput } from '../../data/post';

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

  constructor(private categoryService: CategoryService, private postService: PostService, private fb: FormBuilder) {}

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

  onSubmit(): void {
	if (this.add_post_form.valid) {
		console.log("Formulaire valide")
		const observer: Observer<any> = {
			next: (response) => {
				console.log("Formulaire soumis avec succès!", response);
			},
			error: (err) => {
				console.error("Erreur lors de la soumission du formulaire", err);
			},
			complete: () => {
				console.log("Soumission du formulaire terminée");
			}
		};

		this.postService.createPost(this.add_post_form.value as PostCreateInput).subscribe(observer);
    } else {
    	console.log("Formulaire invalide");
    }
  }
}
