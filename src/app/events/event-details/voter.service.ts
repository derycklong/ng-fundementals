import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISession } from '../events';

@Injectable({
    providedIn:'root'
})

export class VoterService{
    constructor(private http:HttpClient){}

    deleteVoter(eventId:number, session:ISession, voterName:string){
        session.voters = session.voters.filter( voter => voter != voterName)

        let options = { headers: new HttpHeaders({'content-type': 'application/json'})}
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`
        return this.http.delete(url,options)
        .pipe(catchError(this.handleError('deleteVoter')))
    }

    addVoter(eventId:number, session:ISession, voterName:string){
        session.voters.push(voterName)

        let options = { headers: new HttpHeaders({'content-type': 'application/json'})}
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`
        return this.http.post(url,{},options)
        .pipe(catchError(this.handleError('addVoter')))
    }

    userHasVoted(session:ISession, voterName :string):boolean{
        return session.voters.some( voter => voter === voterName) 
    }

    private handleError<T> (operation = 'operation', result?:T) { //handle error (can be copied), can add more code to deal if you want to log error in database .etc
        return (error:any):Observable<T> => {
          console.error(error)
          console.log('hi')
          return of(result as T)
        }
      }

}