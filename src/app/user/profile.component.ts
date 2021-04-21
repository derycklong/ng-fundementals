import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from './auth.service'
import { TOASTR_TOKEN,Toastr } from '../common/toastr.service'
import { IUser } from './user'


@Component({
  templateUrl:'./profile.component.html',
  styles: [`
    em{ float:right; color:red; padding-left: 10px;}
    .error input { background-color:#E3C3C5 }
  `]
})
export class ProfileComponent implements OnInit{
  profileForm: FormGroup
  firstName: FormControl
  lastName: FormControl
  currentUser:IUser


  constructor(private authService:AuthService, private router:Router, @Inject(TOASTR_TOKEN) private toastr:Toastr, private route:ActivatedRoute){}
  ngOnInit(){
  
    console.log(this.route.snapshot.data['profileResolver'].firstName)
    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  onCancel(){
    this.router.navigate(['events']);
    console.log("test")
  }

  logOut(){
    this.authService.logOut().subscribe(() => this.router.navigate(['events']))
  }

  saveProfile(formValues){
    if (this.profileForm.valid){
      this.authService.updateUser(formValues.firstName,formValues.lastName)
      .subscribe(()=>{
        this.toastr.success('Saved')
      })
      
      //this.router.navigate(['events'])
    }
  }

  firstNameValidated(){
    if (this.firstName.valid || this.firstName.untouched){
      return true;
    }
    return false;
  }

  lastNameValidated(){
    if (this.lastName.valid || this.lastName.untouched){
      return true;
    }
    return false;
  }
       
}