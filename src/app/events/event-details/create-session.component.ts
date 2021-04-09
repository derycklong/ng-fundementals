import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router'
import { ISession } from '../events'
import { restrictedWords } from '../shared/restricted-words.validator'

@Component({
    templateUrl:'./create-session.component.html'
})


export class CreateSessionComponent implements OnInit{
    newSessionForm: FormGroup
    name: FormControl
    presenter: FormControl
    duration: FormControl
    level: FormControl
    abstract: FormControl

    constructor(private route:Router){}
    ngOnInit(){
        this.name = new FormControl('',Validators.required)
        this.presenter = new FormControl('',Validators.required)
        this.duration = new FormControl('',Validators.required)
        this.level = new FormControl('',Validators.required)
        this.abstract = new FormControl('',[Validators.required, Validators.maxLength(10), restrictedWords(['foo','bar'])])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract

        })
    }

    saveSession(formValues){
        //this.newSessionForm.dirty
        if (this.newSessionForm.valid){
            console.log(formValues)
            let session:ISession = {
                id: undefined,
                name: formValues.name,
                duration: formValues.duration,
                level: formValues.level,
                presenter: formValues.presenter,
                abstract: formValues.abstract,
                voters: []
            }

            this.route.navigate(['events'])
        }
        else{
            Object.keys(this.newSessionForm.controls).forEach(key => { //loop thru the entire form and mark all the controls as dirty
                this.newSessionForm.controls[key].markAsDirty();
               });
            console.log('you may not pass')
        }



    }



}