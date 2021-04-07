import { Injectable } from "@angular/core";
import { IUser } from "./user";


@Injectable({
    providedIn:'root'
})

export class AuthService{
    currentUser:IUser
    loginUser(userName:string, password:string){
        this.currentUser={
            id:1,
            userName: userName,
            firstName:'John',
            lastName:'Papa'

        }
    }

    isAuth(){
        return !!this.currentUser;
    }

    updateUser(firstName:string, lastName:string){
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
    }

}