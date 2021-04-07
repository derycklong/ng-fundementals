import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { ProfileComponent } from './profile.component'
import { LoginComponent } from './login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule ({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path:'user/profile', component:ProfileComponent} , //lazy loading
            {path:'user/login', component:LoginComponent}
        ])
    
    ],
    declarations: [
        ProfileComponent,
        LoginComponent

    ],
    providers: [

    ]
})

export class UserModule{}