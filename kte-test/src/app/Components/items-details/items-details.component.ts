import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/Services/items.service';
import { IItem } from 'src/app/Models/item';

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.scss']
})
export class ItemsDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private itemsService:ItemsService) { }

  itemId:number = 0;
  item = <IItem>{};

  getItemInfo(): void{
    this.itemsService.getItemInfo(this.itemId).subscribe({
      next: 
        (data:any) => {
          this.item = data;
        }
    })
  }

  ngOnInit(): void {
      this.route.params.subscribe({
        next: 
          params => {
            this.itemId = parseInt(params['id']);
            this.getItemInfo();
          }
      });
  }

}
