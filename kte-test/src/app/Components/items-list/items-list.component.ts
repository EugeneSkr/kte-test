import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/Services/items.service';
import { IItem, IPageParams } from 'src/app/Models/item';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  constructor(private itemsService: ItemsService) {}

  params: IPageParams = {
    page: 1,
    skip: 0,
    limit: 40,
    total: 0,
    totalPages: 1,
    category: 'all',
    search: ''
  }

  searchInput:string = '';
  searchInputChanged:Subject<string> = new Subject<string>();

  categories: Array<string> = [];
  items: Array<IItem> = [];
  
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

  //подсчёт значения для пропуска элементов
  calcSkip(): void{
    this.params.skip = (this.params.page - 1) * this.params.limit;
  }

  //подсчёт количества страниц
  calcTotalPages(): void{
    this.params.totalPages = Math.ceil(this.params.total / this.params.limit);
  }

  //загрузка списка товаров
  getItemsList(): void{
    this.calcSkip();
    this.itemsService.getItemsList(this.params).subscribe({
      next: 
        (data:any) => {
          this.params.total = data.total;
          this.calcTotalPages();
          this.items = data.products;
          
          //this.items = data.items;
          /*this.items = this.items.map((obj:any) => {
            return {...obj, costs: this.helpersService.price(obj.costs) }
          });
          this.itemsPageParams.totalPages = data.totalPages;
          this.itemsPageParams.totalCount = data.totalCount;*/
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
