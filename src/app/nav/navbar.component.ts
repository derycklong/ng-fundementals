import { Component, Inject, Output, EventEmitter } from '@angular/core'
import { ISession } from '../events/events';
import { EventService } from '../events/shared/event.service';
import { SearchService } from '../events/shared/search.service';
import { AuthService } from '../user/auth.service';
import { JQUERY_TOKEN } from '../common/jquery.service'
import { DataService } from '../common/data.service'


@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles:[`
    .nav.navbar-nav {font-size:15px; }
    #searchForm {margin-right: 100px; }
    @media (max-width: 1200px) {#searchForm {display:none}}
    li > a.active { color: #F97924; }
    
    `]
    
})


export class NavBarComponent {
    searchItem: string =''
    foundSessions:ISession[]

    constructor(@Inject(JQUERY_TOKEN) private $:any, private searchService:SearchService, public authService:AuthService, private eventService:EventService, private data:DataService){}
    
    isAuth = !!this.authService.currentUser;

    search(){
        this.searchService.search.emit(this.searchItem);
        console.log(this.searchItem)
    }

    searchSessions(searchTerm){
        this.eventService.searchSessions(searchTerm).subscribe( sessions => {
             this.foundSessions = sessions
             console.log(this.foundSessions)
        })

        this.$('#simple-modal2').modal({});
    }

    emitSession(id:number){
        this.data.changeMessage(id.toString())
        //was trying to build a function to highlight the session after doing the search
        //cant use the @output eventemitter method as there is no relationship
        //need to build a service to communicate
        //https://stackoverflow.com/questions/44414226/angular-4-pass-data-between-2-not-related-components   
    }



}