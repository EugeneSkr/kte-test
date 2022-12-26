import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsDetailsComponent } from './items-details.component';

const routes: Routes = [
  { path: ':id', component: ItemsDetailsComponent, title: "Каталог - просмотр карточки товара"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsDetailsRoutingModule { }