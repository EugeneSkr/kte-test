import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../Config/constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IItem, IPageParams } from '../Models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private constants:Constants, private http:HttpClient) { }

  //загрузка списка товаров
  public getItemsList(params:IPageParams):Observable<any>{
    if(params.search){
      return this.http.get(this.constants.BACKEND + '/products/search', { params: new HttpParams().append('q', params.search) });
    }
    if(params.category !== 'all'){
      return this.http.get(this.constants.BACKEND + '/products/category/' + params.category, { params: new HttpParams({fromObject: params as any}) });
    }
    return this.http.get(this.constants.BACKEND + '/products/', { params: new HttpParams({fromObject: params as any}) });
  }

  //загрузка категорий
  public getCategoriesList():Observable<any>{
    return this.http.get(this.constants.BACKEND + '/products/categories');
  }

  //загрузка товара
  public getItemInfo(itemId:number):Observable<any>{
    return this.http.get(this.constants.BACKEND + '/products/' + itemId);
  }

  //новый товар
  public saveItem(newItem:IItem){
    return this.http.post(this.constants.BACKEND + '/products/add', newItem);
  }
  
}
