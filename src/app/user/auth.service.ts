import { Injectable } from "@angular/core";
import { IUser } from "./user";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { catchError, tap } from "rxjs/operators";
import { of } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class AuthService{

    constructor (private http:HttpClient){}
    currentUser:IUser
    loginUser(userName:string, password:string){
        let loginInfo = { username: userName, password: password }
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})} 
        
        return this.http.post('/api/login',loginInfo,options)
        .pipe(tap( data => {
            this.currentUser = <IUser>data['user']
        }))
        .pipe(catchError(err => {
            return of(false)
        }))
        // this.currentUser={
        //     id:1,
        //     userName: userName,
        //     firstName:'John',
        //     lastName:'Papa'

        // }
    }

    isAuth(){
        return !!this.currentUser;
    }

    checkAuthStatus(){
        return this.http.get('/api/currentIdentity')
        .pipe(tap(data => {
            if (data instanceof Object){
                this.currentUser = <IUser>data
            }
        }))
    }

    logOut(){
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
        return this.http.post('/api/logout',{},options)
            .pipe(tap(()=> this.currentUser=undefined ))
    }

    updateUser(firstName:string, lastName:string){
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})} 
        let body = { firstName: firstName, lastName:lastName}
        return this.http.put('/api/users/'+this.currentUser.id,body,options)
        // .pipe(tap(res =>{
        //     let user = <IUser>res
        //     this.currentUser.firstName= user.firstName
        //     this.currentUser.lastName= user.lastName
        // })).subscribe()
        // this.currentUser.firstName = firstName
        // this.currentUser.lastName = lastName
    }

}