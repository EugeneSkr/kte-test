import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//отображение индикатора загрузки данных
export class LoadingService {

  constructor() { }

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable();
  
  setLoading(isLoading: boolean) {
    this.isLoading$$.next(isLoading);
  }
}
