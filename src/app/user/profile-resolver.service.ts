import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router"
import { AuthService } from "./auth.service";
import { IUser } from "./user";


@Injectable({
    providedIn:'root'
})

export class ProfileResolver implements Resolve<any>{

    constructor (private auth:AuthService){}
    resolve(){
        console.log('In Profile Resolver')
        return this.auth.checkAuthStatus()
        
    }

}