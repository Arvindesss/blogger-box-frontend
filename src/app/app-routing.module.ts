import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { AddPostFormComponent } from './components/add-post-form/add-post-form.component';


const routes: Routes = [
  {path: 'home', component: PostListComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'add-post', component: AddPostFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
