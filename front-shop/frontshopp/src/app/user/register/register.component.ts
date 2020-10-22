import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { MsgService } from '../../shared/services/msg.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../services/user.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    isDisabled: boolean = false;
    user;
    submitting: boolean = false;
    constructor(public router: Router,
        public msgService: MsgService,
        public userService:UserService) {
        this.user = new User({});
        
    }

    submit() {
        this.submitting = true;
        this.userService.register(this.user)
            .subscribe(
                data => {
                    this.msgService.showInfo('Registration successfull, Please login');
                    this.router.navigate(['/user/login']);
                },
                error => {
                    this.submitting = false
                    this.msgService.showError(error);
                }
            )
    }
}


