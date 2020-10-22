import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormsModule } from '@angular/forms';
import {ProductRoutingModule} from './product.routing'
import {ProductService} from "./productService"

@NgModule({
  declarations: [ViewProductComponent, AddProductComponent, EditProductComponent],
  imports: [
    CommonModule,FormsModule,ProductRoutingModule
  ],
  providers:[ProductService]
})
export class ProductModule { }
