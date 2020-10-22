import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AddProductComponent} from './add-product/add-product.component';
import {EditProductComponent  } from './edit-product/edit-product.component';
import {ViewProductComponent} from './view-product/view-product.component'

const productRouting: Routes = [
    {
        path: 'add',
        component: AddProductComponent
    },
    {
        path: 'edit/:id',
        component: EditProductComponent
    },
    {
        path:'view',
        component:ViewProductComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(productRouting)],
    exports: [RouterModule]
})
export class ProductRoutingModule {

}