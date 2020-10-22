import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MsgService} from '../../shared/services/msg.service'
import {ProductService} from '../productService'
import {Item} from '../../shared/models/item.model'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
submitting:boolean=false
item:any
filesToUpload=[]
  constructor(public router:Router,
    public msgService:MsgService,
    public productService:ProductService) {
    this.item= new Item({})
   }

  ngOnInit(): void {
    
  }
  submit()
  {this.submitting = true;
    this.productService.upload(this.item, this.filesToUpload, 'POST')
      .subscribe(
        (data) => {
          this.msgService.showSuccess('Item added susscessfully');
          // this.item = new Item({});
          this.router.navigate(['/product/view']);
        },
        (err) => {
          this.msgService.showError(err);
          this.submitting = false;
        }
      )

  }
  fileChanged(event){
    this.filesToUpload = event.target.files;
  }

}
