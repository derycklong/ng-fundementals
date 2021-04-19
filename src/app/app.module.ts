import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { Error404Component } from './errors/404.component';
import { HttpClientModule } from '@angular/common/http';

import { EventsAppComponent } from './events-app.component';
import { CreateEventComponent } from './events/create-event.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { SessionListComponent } from './events/event-details/session-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventListResolver } from './events/events-list-resolver.service';
import { EventsListComponent } from './events/events-list.component';
import { DurationPipe } from './events/shared/duration.pipe';

import { NavBarComponent } from './nav/navbar.component';
import { UserModule } from './user/user.module';
import { TOASTR_TOKEN,Toastr } from './common/toastr.service'
import { JQUERY_TOKEN } from './common/jquery.service'
import { SimpleModalComponent } from './common/simple-modal.component';
import { UpvoteComponent } from './events/event-details/upvote.component';
import { LocationValidator } from './events/location-validator.directive';
import { EventResolver } from './events/event-resolver.service';

let toastr:Toastr = window['toastr']
let jquery = window['$']


@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    DurationPipe,
    UpvoteComponent,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
      { path : 'events', component: EventsListComponent, resolve: {events:EventListResolver} },
      { path: 'events/:id', component: EventDetailsComponent, resolve: {event:EventResolver} },
      { path: 'events/session/new', component: CreateSessionComponent },
      //{ path: 'user', component: UserModule},
      //{ path: 'user', loadChildren: './user/user.module#UserModule'}, //lazy loading
      //{ path: 'user', loadChildren: () => UserModule}, //lazy loading
      { path : 'error', component: Error404Component },
      { path : '', redirectTo:'/events', pathMatch: 'full'},
      { path : '**', redirectTo:'/events', pathMatch: 'full'},
      
      
    ]),
  ],
  
  providers: [
    { provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState },
    { provide: TOASTR_TOKEN,
      useValue: toastr },
    { provide: JQUERY_TOKEN,
      useValue: jquery },

  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true;
}
