import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class DetailService {
    constructor() {}

    fileUploaded:boolean = false;
    fileName:string;
    names = [];
    dt = new Date();

    clear() {
        this.fileUploaded = false;
        this.fileName = '';
        this.names = [];
    }

    getDateNum():string {
        let date = this.dt.getDate();
        let month = this.dt.getMonth() + 1;
        let year = this.dt.getFullYear();

        return `${date}/${month}/${year}`;
    }
}