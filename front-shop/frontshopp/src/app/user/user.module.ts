import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SearchItemComponent } from './search/search.component';

import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {UserService } from './services/user.service'
import {UserRoutingModule} from './user.routing'
import {SharedModule} from '../shared/shared.module'
import { ItemService } from './services/item.service';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [RegisterComponent, LoginComponent, SearchItemComponent, HomeComponent, ContactComponent],
  imports: [
    CommonModule,FormsModule,HttpClientModule,UserRoutingModule,SharedModule
  ],
  providers:[UserService,ItemService]
})
export class UserModule { }
