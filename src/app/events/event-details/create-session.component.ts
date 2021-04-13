import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core'
import { fillProperties } from '@angular/core/src/util/property'
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router'
import { ISession } from '../events'
import { restrictedWords } from '../shared/restricted-words.validator'

@Component({
    selector:'create-session',
    templateUrl:'./create-session.component.html'
})


export class CreateSessionComponent implements OnInit{
    @Output() EmitsaveNewSession = new EventEmitter()
    @Output() EmitcancelNewSession = new EventEmitter()
    @Input() editSession:ISession
    @Input() newState:boolean
    
    newSessionForm: FormGroup
    id:FormControl
    name: FormControl
    presenter: FormControl
    duration: FormControl
    level: FormControl
    abstract: FormControl

    constructor(private route:Router){}

    ngOnInit(){
        this.id = new FormControl('')
        this.name = new FormControl('',Validators.required)
        this.presenter = new FormControl('',Validators.required)
        this.duration = new FormControl('',Validators.required)
        this.level = new FormControl('',Validators.required)
        this.abstract = new FormControl('',[Validators.required, Validators.maxLength(1000), restrictedWords(['foo','bar'])])

        this.newSessionForm = new FormGroup({
            id: this.id,
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
        console.log('New State: ' + this.newState)

        if (this.editSession && !this.newState){
            this.id.setValue(this.editSession.id)
            this.name.setValue(this.editSession.name)
            this.presenter.setValue(this.editSession.presenter)
            this.duration.setValue(this.editSession.duration)
            this.level.setValue(this.editSession.level)
            this.abstract.setValue(this.editSession.abstract)
        }

        else {
            this.id.setValue('')
            this.name.setValue('')
            this.presenter.setValue('')
            this.duration.setValue('')
            this.level.setValue('')
            this.abstract.setValue('')
        }
            
    }
    saveSession(formValues){
        //this.newSessionForm.dirty
        if (this.newSessionForm.valid && !this.editSession){
            let session:ISession = {
                id: undefined,
                name: formValues.name,
                duration: formValues.duration,
                level: formValues.level,
                presenter: formValues.presenter,
                abstract: formValues.abstract,
                voters: []
            }

            this.EmitsaveNewSession.emit(session)

        }

        else if (this.newSessionForm.valid && this.editSession) {
            let session:ISession = {
                id: formValues.id,
                name: formValues.name,
                duration: formValues.duration,
                level: formValues.level,
                presenter: formValues.presenter,
                abstract: formValues.abstract,
                voters: []
            }
            console.log('logged id : ' + formValues.id)
            console.log('logged name : ' + formValues.name)

            this.EmitsaveNewSession.emit(session)
        }

        
        else{
            Object.keys(this.newSessionForm.controls).forEach(key => { //loop thru the entire form and mark all the controls as dirty
                this.newSessionForm.controls[key].markAsDirty();
               });
            console.log('you may not pass')
        }

    }

    cancelSession(){
        this.EmitcancelNewSession.emit()
        //location.reload()
    }




}