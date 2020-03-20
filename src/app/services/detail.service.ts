import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class DetailService {
    constructor() {}

    fileUploaded:boolean = false;
    fileName:string;
    names = [];
    data = [];
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


    createDataStructure():void {
        this.data = this.names.map(name => {
            return {name:name, status:false}
        });
    }
}