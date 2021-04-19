import { Component, Inject } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TOASTR_TOKEN,Toastr} from '../common/toastr.service'

@Component({
    templateUrl:'./login.component.html',
    styles:[`
        em { float:right; color:#E05C65; padding-left:10px; }
        .error input { background-color:#E3C3C5 }
    `]
})

export class LoginComponent{
    userName:string
    password:string
    mouseoverLogin:boolean

    constructor(private authService:AuthService, private router:Router, @Inject(TOASTR_TOKEN) private toastr:Toastr){}

    login(formValue){
        this.authService.loginUser(formValue.userName,formValue.password)
            .subscribe(res => {
                if (res===false){
                    this.toastr.error('Invalid Login','Please try again')
                }
                else this.router.navigate(['events'])
            })
        //console.log(this.authService.isAuth())
        
    }

    onCancel(){
        this.router.navigate(['events'])
    }

}