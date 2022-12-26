import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsNewComponent } from './items-new.component';


const routes: Routes = [
  { path: '', component: ItemsNewComponent, title: "Каталог - новый товаров"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsNewRoutingModule { }