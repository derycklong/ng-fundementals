import { Component, Input, ViewChild, ContentChild, ElementRef, Inject } from '@angular/core'
import { JQUERY_TOKEN } from '../common/jquery.service'

@Component({
    selector:'simple-modal',
    template:`
    <div id="simple-modal2" #modalContainer class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" (click)="closeModal()">
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body" #modalContainer (click)="closeModal()">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    </div>
    
    `,
    styles:[`
        .modal-body {
            height:800px; 
            overflow-y:scroll;
        }
    `]
})

export class SimpleModalComponent{
    @Input() title:string
    @ViewChild('modalContainer') containerEl:ElementRef
    @ContentChild('modalContainer2') containerEl2:ElementRef
    
    constructor(@Inject(JQUERY_TOKEN) private $:any){}

    //Actually we can just input this data-dismiss="modal" in a tag and it will close

    closeModal(){
        this.$(this.containerEl.nativeElement).modal('hide')
        console.log(this.containerEl.nativeElement)
    }
}