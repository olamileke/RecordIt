import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class DetailService {
    constructor() {}

    fileUploaded:boolean = false;
    fileName:string;
    names = [];
    data = [];
    dt = new Date();
    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

    getDateString():string {
        let date = this.dt.getDate();
        let day = this.days[this.dt.getDay()];
        let month = this.months[this.dt.getMonth()];
        let year = this.dt.getFullYear();

        return `${day} ${date} ${month}, ${year}`;
    }

    createDataStructure():void {
        this.data = this.names.map(name => {
            return {name:name, status:false}
        });
    }

    getPresent():any[] {
        return this.data.map(row => {
            if(row.status) {
                return {name:row.name};
            }
        });
    }
}