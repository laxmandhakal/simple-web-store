import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { MsgService } from '../../shared/services/msg.service';
import { Item } from '../../shared/models/item.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  item:any;
  items: Array<any> = [];
  allItems = [];
  imgUrl:string;
  constructor(
    public itemService: ItemService,
    public router: Router,
    public msgService: MsgService
  ) {
    this.item = new Item({});
    this.imgUrl=environment.ImgURL
    this.submit()
  }

  ngOnInit() {
    
  }

  submit() {
    this.itemService.search(this.item)
      .subscribe(
        (data: any) => {
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

}
