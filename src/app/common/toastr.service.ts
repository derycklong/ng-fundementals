import { Injectable } from "@angular/core";
declare let toastr: any
@Injectable({
    providedIn:'root'
})
export class ToastrService{
    success(message: string, title?: string){
        toastr.success(message,title)
    }
    info(message: string, title?: string){
        toastr.info(message,title, { 
            tapToDismiss: true,
            extendedTimeout: 1000,
            timeOut:10000,
            closeButton: true
         })
    }
    warning(message: string, title?: string){
        toastr.warning(message,title)
    }
    error(message: string, title?: string){
        toastr.error(message,title)
    }


}