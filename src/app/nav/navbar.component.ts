import { Component } from '@angular/core'
import { SearchService } from '../events/shared/search.service';

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
    searchItem: string ='';

    constructor(private searchService:SearchService){}

    search(){
        this.searchService.search.emit(this.searchItem);
        console.log(this.searchItem)
    }

}