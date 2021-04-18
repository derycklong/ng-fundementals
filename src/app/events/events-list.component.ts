import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service'
import { IEvent } from './events'
import { Subscription } from 'rxjs';
import { SearchService } from './shared/search.service';
import { ActivatedRoute } from '@angular/router'


@Component({
    selector:'events-list',
    template: `
    <div>
        <h1>Upcoming Angular Event </h1>
        <div class="row">
        <ng-container *ngIf="!filteredEvents">
        <div *ngFor="let event1 of events" class="col-md-5">
            <event-thumbnail #thumbnail [event]="event1"></event-thumbnail>
        </div>
        </ng-container>
        <ng-container *ngIf="filteredEvents">
            <div *ngFor="let event1 of filteredEvents" class="col-md-5">
                <event-thumbnail #thumbnail [event]="event1"></event-thumbnail>
            </div>
        </ng-container>
        </div>
        
    </div>
    `    
})

export class EventsListComponent implements OnInit{
  events:IEvent[];
  filteredEvents:IEvent[];
  sub:Subscription
  constructor(private eventService: EventService, private searchService:SearchService, private route:ActivatedRoute){
    this.sub = this.searchService.search.subscribe( value => this.performFilter(value) )
  }

  ngOnInit(){
    //this.eventService.getEvents().subscribe( events => { this.events = events})
    this.events = this.route.snapshot.data['events']
    
  }
  
  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredEvents = this.events.filter(e => {
        if (e && e.name ) {
          return e.name.toLocaleLowerCase().includes(filterBy);
        } 
        else {
          return false;
        }
      })
  }
}


  



