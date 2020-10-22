import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {SearchItemComponent} from './search/search.component'

const userRouting: Routes = [
    {path:'home',
     component:HomeComponent
     },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path:'search',
        component:SearchItemComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(userRouting)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}