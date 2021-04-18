import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { map } from 'rxjs/operators'
import { EventService } from './shared/event.service'


@Injectable ({
    providedIn:'root'
})

//Resolver acts like a middleware, which can be executed before a component is loaded.
export class EventResolver implements Resolve<any>{

    constructor(private eventService:EventService){}
    
    resolve(route:ActivatedRouteSnapshot){
        return this.eventService.getEvent(route.params['id'])

    }
}