import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { DetailService } from '../../services/detail.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  EXCEL_TYPE='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION='.xlsx';
  date = this.detail.getDateNum();
  displaySidebar:boolean = false;
  tabs = {all:true, search:false, add:false, compile:false, absent:false, error:false};
  constructor(private router:Router, private detail:DetailService, private notif:NotificationService) { }

  ngOnInit() {
	this.checkForFile();
  }

  checkForFile():void {
	if(!this.detail.fileUploaded) {
		this.router.navigate(['/']);
		this.notif.error('Upload a valid file!');
	}
  }

  switchTab(tab:string):void {
	for(let tab in this.tabs) {
		this.tabs[tab] = false;
	}

	this.tabs[tab] = true;
	// Closing the sidebar immediately after click on tablets and mobile
	screen.width <= 991 ? this.displaySidebar = !this.displaySidebar : this.displaySidebar = this.displaySidebar;
  }

  toggleSidebar():void {
	this.displaySidebar = !this.displaySidebar;
  }

  checkViewPort():boolean {
	if(screen.width < 991) {
	    return true;
	}

	return false;
  }

  download():void {
	let stewards:string[];
	let filename = `chaplaincy_meeting_attendance_${this.detail.getDateString()}.xlsx`;
	this.tabs.compile ? stewards = this.detail.getPresent() : stewards = this.detail.getAbsent();
	if(stewards.length == 0) {
		this.tabs.compile ? this.notif.error('No present stewards!') : this.notif.error('No absent stewards!');
		return;
	}

	this.tabs.absent ? filename = `chaplaincy_meeting_attendance_absent_${this.detail.getDateString()}.xlsx` : filename = `chaplaincy_meeting_attendance_${this.detail.getDateString()}.xlsx`;

	let workbook:XLSX.WorkBook = {Sheets:{}, SheetNames:[]};
	let worksheet:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.formatDownloadData(stewards));
	workbook.Sheets['Stewards'] = worksheet;
	workbook.SheetNames.push('Stewards');

	const buffer = XLSX.write(workbook, {bookType:'xlsx', type:'array'});
	const data:Blob = new Blob([buffer], {type:this.EXCEL_TYPE});
	FileSaver.saveAs(data, filename);
  }

  formatDownloadData(records:any[]):any[] {
	records.forEach(record => {
		delete record.status;
	})

	return records;
  }

}
