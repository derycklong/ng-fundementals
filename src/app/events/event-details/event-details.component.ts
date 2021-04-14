import { Component, OnInit, Output,EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "src/app/common/toastr.service";
import { ISession } from "../events";
import { EventService } from "../shared/event.service";


@Component({
    templateUrl:'./event-details.component.html',
    styles:[`
        .container { padding-left:20px; padding-right: 20px; }
        .event-image { height: 100px; }
    `]
    
})

export class EventDetailsComponent implements OnInit{
    event:any;
    sessions:ISession[]
    session:ISession
    addMode:boolean
    newState:boolean
    @Output() emitNewState = new EventEmitter
    
    constructor(private eventService:EventService, private route:ActivatedRoute, private toastrService:ToastrService){}
    
    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.event = this.eventService.getEvent(id);
        console.log(this.event)
    }

    addSession(){
        this.newState = true   //this flag is here because we are sharing update and new in the same page
        this.addMode = true
    }

    saveNewSession(session:ISession){
        if (!session.id && this.event.sessions){
            console.log('id is ' + session.id)
            const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
            console.log(this.event.sessions.map(s=>s.id))
            session.id = nextId + 1
            this.event.sessions.push(session)
            this.eventService.updateEvent(this.event) // is this necc
        }

        else if (!this.event.sessions){
            session.id = 1
            this.event.sessions = [] //need to initilize to an empty array since for this case event.sessions is empty
            this.event.sessions.push(session)
            this.eventService.updateEvent(this.event)
        }

        else if (session.id) {
            console.log('your final id is' + session.id)
            let index = this.event.sessions.findIndex(x => x.id == session.id)
            this.event.sessions[index] = session
            //console.log(this.event.sessions.id.indexOf({ id: session.id }))
        }
        this.addMode=false
        this.newState=false

    }
    cancelNewSession(){
        this.addMode=false
        this.newState=false
    }
    getEditSession(session){
        this.session=session
        this.addMode = true
    }


}