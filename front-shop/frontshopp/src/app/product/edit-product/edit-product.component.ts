import { Component, OnInit } from '@angular/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../productService';
import { environment } from '../../../environments/environment ';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id;
  item;
  isSubmitting: boolean = false;
  isLoading: boolean = false;
  imgURL;
  fileToUpload = [];
  constructor(
    public msgService: MsgService,
    public router: Router,
    public productService: ProductService,
    public activeRoute: ActivatedRoute
  ) {
    this.id = this.activeRoute.snapshot.params['id'];
    this.imgURL = environment.ImgURL;
    // constructor code block run first
    console.log('id >>', this.id);
  }

  ngOnInit() {
    this.isLoading = true;
    this.productService.getById(this.id)
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          console.log('data is >>>', data);
          this.item = data;
          if (data.discount) {
            this.item.discountedItem = data.discount.discountedItem;
            this.item.discountType = data.discount.discountType;
            this.item.discountUnit = data.discount.discountUnit;
          }
        }, error => {
          this.isLoading = false;
          this.msgService.showError(error);
        });
  }

  submit() {
    this.isSubmitting = true;
    this.productService.upload(this.item, this.fileToUpload, 'PUT')
      .subscribe((data) => {
        this.msgService.showInfo('Item updated successfuly');
        this.router.navigate(['/product/view']);
      }, (err) => {
        this.isSubmitting = false;
        this.msgService.showError(err);
      })
  }

  fileChanged(ev) {
    this.fileToUpload = ev.target.files;
  }

}
