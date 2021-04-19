import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { userInfo } from 'os';
import { AuthService } from './user/auth.service';
import { IUser } from './user/user'

@Component({
  selector: 'events-app',
  template: `
  <nav-bar></nav-bar>  
  <router-outlet></router-outlet>
    `,

})
export class EventsAppComponent {
  constructor(private auth:AuthService, private route: ActivatedRoute){}

  ngOnInit(){
    this.auth.checkAuthStatus().subscribe()
  }
}
