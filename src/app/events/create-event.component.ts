import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "./shared/event.service";

@Component({
    templateUrl:'./create-event.component.html',
    styles:[`
    em { float:right; color:#E05C65; padding-left:10px; }
    .error input { background-color:#E3C3C5 }
    `]
})

export class CreateEventComponent{
    newEvent;
    isDirty:boolean = true;
    constructor(private router:Router, private eventService:EventService){}
    onCancel(){
        this.router.navigate(['events'])

    }

    saveEvent(formValues){
        this.eventService.saveEvent(formValues)
        console.log(!!formValues.valid)
        this.isDirty=false
        this.router.navigate(['events'])
        
    }


}