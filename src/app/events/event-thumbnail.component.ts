import { Component,Input, Output,EventEmitter } from '@angular/core'


@Component({
    selector:'event-thumbnail',
    template:`
    <div class="well hoverwell thumbnail" [routerLink]="['/events',event.id]">
        <h2>{{event?.name}}</h2>
        <div>Date : {{event?.date | date:'d/M/y'}}</div>
        <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>
        <div [ngStyle]="getPriceClass()">Price: {{event?.price | currency:'Usd'}}</div>
        <div *ngIf='event?.location'>
            <span>Location: {{event?.location?.address}}</span>
            <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
        </div>
        <div *ngIf='event?.onlineUrl'>Online URL: {{event?.onlineUrl}}</div>
       
    </div>
    `,
    styles:[
        `
        .bold { font-weight: bold}
        .green { color: #003300 !important;}
        .red { color: red !important;}
        .thumbnail { min-height: 210px; }
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb; }
        `
    ]
})


export class EventThumbnailComponent {
    @Input() event:any;
    //Showing NgClass application
    getStartTimeClass(){
        const isEarly = this.event && this.event.time == '8:00 am';
        if(isEarly)
            return 'green bold'
        return ''

    }
    //Showing NgStyle application
    getPriceClass(){
        if(this.event && this.event.price >= 800)
            return {color: 'red', 'font-weight':'bold'}
        return {}

    }

}