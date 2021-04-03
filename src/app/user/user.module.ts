import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { ProfileComponent } from './profile.component'

@NgModule ({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path:'profile', component:ProfileComponent}  //lazy loading
        ])
    
    ],
    declarations: [
        ProfileComponent

    ],
    providers: [

    ]
})

export class UserModule{}