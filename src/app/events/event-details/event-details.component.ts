import { Component, OnInit, Output,EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
    filterBy:string = 'all'
    sortBy:string= 'votes'
    
    constructor(private eventService:EventService, private route:ActivatedRoute){}
    
    ngOnInit() {
        // const id = Number(this.route.snapshot.paramMap.get('id'));
        // this.event = this.eventService.getEvent(id);
        // console.log(this.event)
        this.route.params.forEach( params => { //please take note to use foreach when routing a component to itself
            this.event = this.eventService.getEvent(+params["id"])
            this.addMode=false
            
        })
        

    }

    addSession(){
        this.newState = true   //this flag is here because we are sharing update and new in the same page
        this.addMode = true
    }

    saveNewSession(session:ISession){
        if (!session.id && this.event.sessions){ //new event
            console.log('id is ' + session.id)
            const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
            console.log(this.event.sessions.map(s=>s.id))
            session.id = nextId + 1
            this.event.sessions.push(session)
            this.eventService.updateEvent(this.event) // is this necc
        }

        else if (!this.event.sessions){ // add event when there is no session for the event
            session.id = 1
            this.event.sessions = [] //need to initilize to an empty array since for this case event.sessions is empty
            this.event.sessions.push(session)
            this.eventService.updateEvent(this.event)
        }

        else if (session.id) { //edit event
            console.log('your final id is' + session.id)
            let index = this.event.sessions.findIndex(x => x.id == session.id)
            this.event.sessions[index] = session
            //console.log(this.event.sessions.id.indexOf({ id: session.id }))
        }
        this.addMode=false
        this.newState=false
        this.session = null

    }
    cancelNewSession(){
        this.addMode=false
        this.newState=false
        this.session=null
    }
    getEditSession(session){
        this.session=session
        this.addMode = true
    }

    getEmitSession(id){
        console.log('Emitted Session' + id)
    }

}