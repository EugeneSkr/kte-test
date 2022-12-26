import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsDetailsRoutingModule } from './items-details-routing.model';
import { ItemsDetailsComponent } from './items-details.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    ItemsDetailsRoutingModule,
    MatCardModule,
    CommonModule
  ],
  declarations: [ItemsDetailsComponent]
})
export class ItemsNewModule { }
