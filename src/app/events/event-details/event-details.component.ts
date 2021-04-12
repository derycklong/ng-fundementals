import { Component, OnInit } from "@angular/core";
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
    sessions:ISession[];
    addMode:boolean
    
    constructor(private eventService:EventService, private route:ActivatedRoute, private toastrService:ToastrService){}
    
    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.event = this.eventService.getEvent(id);
        
        console.log(this.sessions)

    }

    addSession(){
        this.addMode = true
    }

    saveNewSession(session:ISession){
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        console.log(this.event.sessions.map(s=>s.id))
        session.id = nextId + 1
        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event) // is this necc
        this.addMode=false

    }

    cancelNewSession(){
        this.addMode=false
    }

    handleSessionClick(sid:string){
        console.log('hi')
        
    }

}