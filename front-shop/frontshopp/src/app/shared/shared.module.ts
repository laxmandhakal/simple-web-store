import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MsgService} from './services/msg.service'
import {LoaderComponent} from './loader/loader.component'

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ],
  providers:[MsgService],
  exports:[LoaderComponent]
})
export class SharedModule { }
