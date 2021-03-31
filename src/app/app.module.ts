import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';

import { EventsAppComponent } from './events-app.component';
import { CreateEventComponent } from './events/create-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventsListComponent } from './events/events-list.component';
import { NavBarComponent } from './nav/navbar.component';


@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'events/new', component: CreateEventComponent },
      { path : 'events', component: EventsListComponent },
      { path: 'events/:id', component: EventDetailsComponent,canActivate:[EventRouteActivator] },
      { path : 'error', component: Error404Component },
      { path : '', redirectTo:'/events', pathMatch: 'full'},
      { path : '**', redirectTo:'/events', pathMatch: 'full'}
    ]),
  ],
  
  providers: [],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
