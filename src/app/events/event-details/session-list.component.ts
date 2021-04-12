import { Component, Input } from '@angular/core';
import { ISession } from '../events';

@Component({
    selector:'session-list',
    templateUrl:'./session-list.component.html'
})


export class SessionListComponent {
    @Input() sessions:ISession[]

    handleSessionClick(sid:string){ // trying to buuild a function to click and edit the session list
        console.log(sid)
        
    }
}