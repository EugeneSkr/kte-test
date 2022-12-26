import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './Components/items-list/items-list.component';


const routes: Routes = [
  { path: '', component: ItemsListComponent, title: "Каталог - список товаров"},
  { path: 'new',  loadChildren: () => import('./Components/items-new/items-new.module').then(m => m.ItemsNewModule) },
  { path: 'details', loadChildren: () => import('./Components/items-details/items-details.module').then(m => m.ItemsNewModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
