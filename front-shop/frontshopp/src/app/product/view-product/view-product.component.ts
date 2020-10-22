import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../productService';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { Item } from 'src/app/shared/models/item.model';
import { environment } from '../../../environments/environment ';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  items:any;
  isLoading: boolean = false;
  imgUrl;
  @Input() inputData;
  title: string = 'View Items';
  constructor(
    public productService: ProductService,
    public router: Router,
    public msgService: MsgService
  ) {
    this.imgUrl = environment.ImgURL;
    console.log('input data will not apperar here', this.inputData)
  }

  ngOnInit() {
    console.log('input data of component', this.inputData);
    if (this.inputData) {
      this.title = "Search Results"
      this.items = this.inputData;
      return;
    }
    this.isLoading = true;
    this.productService.get()
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.items = data || [];
        },
        (err) => {
          this.isLoading = false;
          this.msgService.showError(err);
        }
      )
  }

  remove(id, index) {
    let confirmation = confirm('Are you sure to remove?');
    if (confirmation) {
      this.productService.remove(id)
        .subscribe(
          (data: any) => {
            this.msgService.showInfo('Item Deleted');
            this.items.splice(index, 1);
          },
          error => {
            this.msgService.showError(error);
          }
        )
    }
  }
 

}
