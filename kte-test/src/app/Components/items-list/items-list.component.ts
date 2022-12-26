import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/Services/items.service';
import { IItem, IPageParams } from 'src/app/Models/item';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { LoadingService } from 'src/app/Services/loading.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  constructor(private itemsService: ItemsService, public loadingService: LoadingService, private router:Router) {}

  params: IPageParams = {
    page: 0,
    skip: 0,
    limit: 25,
    total: 0,
    totalPages: 1,
    category: 'all',
    search: ''
  }

  pageSize: Array<number> = [25, 50, 100];

  searchInput:string = '';
  searchInputChanged:Subject<string> = new Subject<string>();

  categories: Array<string> = [];
  items: Array<IItem> = [];

  //просмотр деталей товара
  showDetails(id:number): void{
    this.router.navigate(
      ['/details', id]
    );
    
  }

  //пагинатор
  changePage(e: PageEvent): void{
    this.params.page = e.pageIndex;
    this.params.limit = e.pageSize;
    this.params.skip = this.params.page * this.params.limit;
    this.getItemsList();
  }
  
  //загрузка списка категорий
  getCategoriesList(): void{
    this.itemsService.getCategoriesList().subscribe({
      next:
       (data:any) => {
        this.categories = data;
        this.categories.unshift('all');
       }
    })
  }

  //подсчёт количества страниц
  calcTotalPages(): void{
    this.params.totalPages = Math.ceil(this.params.total / this.params.limit);
  }

  //загрузка списка товаров
  getItemsList(): void{
    this.itemsService.getItemsList(this.params).subscribe({
      next: 
        (data:any) => {
          this.params.total = data.total;
          this.calcTotalPages();
          this.items = data.products;
        }
    })
  }

  ngOnInit(): void {
    this.getCategoriesList();
    this.getItemsList();

    //поиск по заказам
    this.searchInputChanged.pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe(
      searchText => {
        if(searchText.length >= 2){
          this.params.search = searchText;
        }
        else{
          this.params.search = '';
        }
        this.getItemsList();
      }
    );
  }

}
