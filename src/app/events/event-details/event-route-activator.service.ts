import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, CanActivate } from "@angular/router";
import { EventService } from "../shared/event.service";

@Injectable({
    providedIn: 'root'
})
export class EventRouteActivator implements CanActivate{

    constructor(private eventService:EventService, private router:Router){
        
    }



    canActivate(route:ActivatedRouteSnapshot){
        const eventExist = Boolean(this.eventService.getEvent(+route.paramMap.get('id')))

        if (!eventExist)
            this.router.navigate(['error'])
        return eventExist
    }
}