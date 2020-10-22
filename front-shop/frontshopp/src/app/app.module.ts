import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { UserModule } from './user/user.module';
import {ProductModule} from './product/product.module'
import { SharedModule } from './shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
// NgModule is decorator which define class
// routing configuration here
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
     BrowserModule, //only root module will have browsermodule
    AppRoutingModule,
    UserModule,
    ProductModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [],
  exports: [],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
