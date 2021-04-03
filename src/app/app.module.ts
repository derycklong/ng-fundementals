import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';

import { EventsAppComponent } from './events-app.component';
import { CreateEventComponent } from './events/create-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventListResolver } from './events/events-list-resolver.service';
import { EventsListComponent } from './events/events-list.component';
import { NavBarComponent } from './nav/navbar.component';
import { UserModule } from './user/user.module';



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
    FormsModule,
    RouterModule.forRoot([
      { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
      { path : 'events', component: EventsListComponent, resolve: {events:EventListResolver} },
      { path: 'events/:id', component: EventDetailsComponent,canActivate:[EventRouteActivator] },
      { path: 'user', loadChildren: './user/user.module#UserModule'}, //lazy loading
      //{ path: 'user', loadChildren: () => UserModule}, //lazy loading
      { path : 'error', component: Error404Component },
      { path : '', redirectTo:'/events', pathMatch: 'full'},
      { path : '**', redirectTo:'/events', pathMatch: 'full'},
      
    ]),
  ],
  
  providers: [{
    provide: 'canDeactivateCreateEvent',
    useValue: checkDirtyState
  }],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true;
}
