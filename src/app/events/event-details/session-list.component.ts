import { Component, Input, Output,EventEmitter, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { ISession } from '../events';
import { VoterService } from './voter.service';

@Component({
    selector:'session-list',
    templateUrl:'./session-list.component.html'
})


export class SessionListComponent implements OnChanges{
    @Input() sessions:ISession[]
    @Output() emitEditSession = new EventEmitter()
    @Input() filterBy:string
    @Input() sortBy:string
    visibleSessions:ISession[] = []

    constructor (private auth:AuthService, private voterService:VoterService){}
    
    ngOnChanges(){
        if (this.sessions){
            this.filterSessions(this.filterBy)
            this.sortBy === 'name' ? this.visibleSessions.sort((a,b) => {
                if (a.name > b.name ) return 1
                else if (a.name === b.name) return 0
                else return -1
            })
            : this.visibleSessions.sort((a,b) => {
                return b.voters.length - a.voters.length
            })
        }
    }

    handleSessionClick(session:ISession){ // trying to buuild a function to click and edit the session list
        this.emitEditSession.emit(session)
        //console.log(session)    
    }

    filterSessions(value:string){
        if (value==='all'){
            this.visibleSessions = this.sessions.slice(0)
        }
        else {
            this.visibleSessions = this.sessions.filter( sessions => {
                return sessions.level.toLocaleLowerCase() === value
            })
        }
    }

    toggleVote(session:ISession){
        if(this.userHasVoted(session)){
            this.voterService.deleteVoter(session,this.auth.currentUser.userName)
        }
        else {
            this.voterService.addVoter(session,this.auth.currentUser.userName)
        }
        if(this.sortBy==='votes'){
            this.visibleSessions.sort((a,b) => {
                return b.voters.length - a.voters.length
            })
        }
    }

    userHasVoted(session:ISession){
        return this.voterService.userHasVoted(session,this.auth.currentUser.userName)

    }
}