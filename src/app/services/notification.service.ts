import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn:'root'
})
export class NotificationService {

    constructor(private toastr:ToastrService) { }

    success(message:string, title?:string) {
        this.toastr.success(message, title);
    }

    error(message:string, title?:string) {
        this.toastr.error(message, title);
    }

}