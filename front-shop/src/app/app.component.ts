import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontshopp';
  token:string
  constructor(){
    this.token=localStorage.getItem('token')
  }
  logout()
  {
    localStorage.clear()
  }
}
