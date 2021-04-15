import { Component } from '@angular/core'
import { Observable } from 'rxjs';
import { ISession } from '../events/events';
import { EventService } from '../events/shared/event.service';
import { SearchService } from '../events/shared/search.service';
import { AuthService } from '../user/auth.service';

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
    foundSessions:ISession

    constructor(private searchService:SearchService, public authService:AuthService, private eventService:EventService){}

    
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
        
    }

}