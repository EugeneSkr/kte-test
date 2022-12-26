import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IItem } from 'src/app/Models/item';
import { ItemsService } from 'src/app/Services/items.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-items-new',
  templateUrl: './items-new.component.html',
  styleUrls: ['./items-new.component.scss']
})
export class ItemsNewComponent implements OnInit {

  reactiveForm:any;
  constructor(private fb: FormBuilder, private router:Router, private itemsService: ItemsService) { }

  noticeMessage:string = '';


  newItem = <IItem>{};

  saveItem(): void{
    this.newItem = {
      id: 0,
      brand: this.reactiveForm.controls.brand.value,
      category: this.reactiveForm.controls.category.value,
      description: this.reactiveForm.controls.description.value,
      discountPercentage: this.reactiveForm.controls.discount.value,
      images: [],
      price: this.reactiveForm.controls.price.value,
      rating: this.reactiveForm.controls.rating.value,
      stock: 0,
      thumbnail: '',
      title: this.reactiveForm.controls.title.value
    }
    this.itemsService.saveItem(this.newItem).subscribe({
      next:
       (data:any) => {
        this.noticeMessage = `Товар добавлен. #id:${data.id}`;
        this.reactiveForm.reset();
       }
    })
  }

  

  categories: Array<string> = [];
  
  //загрузка списка категорий
  getCategoriesList(): void{
    this.itemsService.getCategoriesList().subscribe({
      next:
       (data:any) => {
        this.categories = data;
       }
    })
  }

  //закрытие формы
  cancel(): void{
    this.router.navigate(
      ['/']
    );
  }

  //проверка валидности элемента формы
  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
  

  ngOnInit(): void {
    this.reactiveForm = this.fb.group({
      title: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      rating: ['', [Validators.required, CustomValidator]],
      discount: [''],
      images: [''],
    })
    this.getCategoriesList();
  }

}

function CustomValidator(formControl: FormControl): null | any{
    if(formControl.value < 0 || formControl.value > 5){
      return { CustomValidator: {message: 'Wrong value'} }
    }
    return null;
}
