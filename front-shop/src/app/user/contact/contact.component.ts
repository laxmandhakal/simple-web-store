import { Component, OnInit } from '@angular/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import {UserService} from '../services/user.service'
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
user:any
id:string

  constructor(public userService:UserService, public msgService:MsgService,
    public activeRoute:ActivatedRoute,
    public router:Router) {
this.id=this.activeRoute.snapshot.params['id']
   }

  ngOnInit(): void {
this.userService.contact(this.id).subscribe((data)=>{
  this.user=data;
  console.log("user>>",data)
},(err)=>this.msgService.showError(err)
)

  }

}
