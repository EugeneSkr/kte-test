import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsNewRoutingModule } from './items-new-routing.module';
import { ItemsNewComponent } from './items-new.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ItemsNewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ],
  declarations: [ItemsNewComponent]
})
export class ItemsNewModule { }
