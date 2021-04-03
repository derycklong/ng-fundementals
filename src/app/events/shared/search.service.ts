import { Injectable,EventEmitter } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class SearchService{
    search = new EventEmitter<string>();

}