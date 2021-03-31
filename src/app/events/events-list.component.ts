import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core'
import { ToastrService } from '../common/toastr.service';
import { EventService } from './shared/event.service'


@Component({
    selector:'events-list',
    template: `
    <div>
        <h1>Upcoming Angular Event </h1>
        <div class="row">
            <div *ngFor="let event1 of events" class="col-md-5">
                <event-thumbnail (click)="handleThumbnailClick(event1.name,event1.date)" #thumbnail [event]="event1"></event-thumbnail>
            </div>
        </div>
        
    </div>
    `    
})

export class EventsListComponent implements OnInit{
  events:any[];
  constructor(private eventService: EventService, private toastrService:ToastrService){}

  ngOnInit(){
    this.events =this.eventService.getEvents();
  }

  handleThumbnailClick(eventName,eventDate){
    this.toastrService.info('Date: '+eventDate,eventName);
  }

  



}