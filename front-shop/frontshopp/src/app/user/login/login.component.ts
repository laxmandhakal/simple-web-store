import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from'../../shared/services/msg.service';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user;
  submitting: boolean = false;
  constructor(
    public router: Router,
    public msgService: MsgService, // service are injectable and should be injected in constructor to add in this of class
    public userService: UserService

  ) {
    this.user = new User({});
  }

  ngOnInit() {
    // component life cycle hook
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  
  login() {
    
    this.submitting = true;
    this.userService.login(this.user)
      .subscribe(
        (data: any) => {
          console.log('data in >>>', data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.msgService.showSuccess(`Welcome ${data.user.username}`);
          this.router.navigate(['/product/add']).then(() => {
            window.location.reload();
          });
          
        },
        (err) => {
          this.submitting = false;
          this.msgService.showError(err);
        });
        


  }
}
