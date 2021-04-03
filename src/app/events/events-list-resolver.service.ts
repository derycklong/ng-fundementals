import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { map } from 'rxjs/operators'
import { EventService } from './shared/event.service'


@Injectable ({
    providedIn:'root'
})

//Resolver acts like a middleware, which can be executed before a component is loaded.
export class EventListResolver implements Resolve<any>{

    constructor(private eventService:EventService){}
    resolve(){
        return this.eventService.getEvents().pipe(map(events => events))

    }
}