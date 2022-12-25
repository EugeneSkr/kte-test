import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './Components/items-list/items-list.component';
import { ItemsDetailsComponent } from './Components/items-details/items-details.component';
import { ItemsNewComponent } from './Components/items-new/items-new.component';

const routes: Routes = [
  { path: '', component: ItemsListComponent, title: "Каталог - список товаров"},
  { path: 'new', component: ItemsNewComponent, title: "Каталог - новый товаров"},
  { path: 'details', component: ItemsDetailsComponent, title: "Каталог - карточка товара"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
