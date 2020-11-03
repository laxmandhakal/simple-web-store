import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { MsgService } from '../../shared/services/msg.service';
import { Item } from '../../shared/models/item.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search-item',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchItemComponent implements OnInit {
  item:any;
  items: Array<any> = [];
  submitting: boolean = false;
  categories = [];
  names = [];
  allItems = [];
  imgUrl:string;
  constructor(
    public itemService: ItemService,
    public router: Router,
    public msgService: MsgService
  ) {
    this.item = new Item({});
    this.item.category = '';
    this.imgUrl=environment.ImgURL
  }

  ngOnInit() {
    this.itemService.search({})
      .subscribe(
        (data: any) => {
          this.allItems = data;
          this.allItems.forEach((item) => {
            if (this.categories.indexOf(item.category) == -1) {
              this.categories.push(item.category);
            }
          })
        },
        err => {
          this.msgService.showError(err);
        }
      )
    
  }

  submit() {
    this.submitting = true;
    this.itemService.search(this.item)
      .subscribe(
        (data: any) => {
          this.submitting = false;
          if (!data.length) {
            return this.msgService.showInfo('No any item matched your search query');
          }
          this.items = data;
          console.log('search result >>>', data);
        },
        err => {
          this.msgService.showError(err);
        })
  }
  searchAgain()
  {
    this.items=[];
  }
  categoryChanged(val) {
    this.item.name = '';
    this.names = this.allItems.filter((item) => {
      if (item.category == val) {
        return true;
      }
    })
  }
  

}
