import { Component } from '@angular/core';
import { Category } from '../../data/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrl: './add-post-form.component.css'
})
export class AddPostFormComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
      this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
