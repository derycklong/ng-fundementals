import { Component, Input, Output,EventEmitter } from '@angular/core';
import { ISession } from '../events';

@Component({
    selector:'session-list',
    templateUrl:'./session-list.component.html'
})


export class SessionListComponent {
    @Input() sessions:ISession[]
    @Output() emitEditSession = new EventEmitter()

    handleSessionClick(session:ISession){ // trying to buuild a function to click and edit the session list
        this.emitEditSession.emit(session)
        //console.log(session)
        
    }
}