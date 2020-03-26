import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';
import * as XLSX from 'xlsx';

import { NotificationService } from '../../services/notification.service';
import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('file') fileInput;
  fileName:string;
  fileUpoaded = false;

  constructor(private notification:NotificationService, private router:Router, private detail:DetailService) { }

  ngOnInit() {
		this.setVariables();
  }

  setVariables():void {
	if(this.detail.fileUploaded) {
		this.fileUpoaded = this.detail.fileUploaded;
		this.fileName = this.detail.fileName;
	}
  }

  browse():void {
    this.fileInput.nativeElement.click();
  }

  evalDroppedFile(event:UploadEvent) {
	const file = event.files[0];

	if(file.fileEntry.isFile) {
		const fileEntry = file.fileEntry as FileSystemFileEntry;
		fileEntry.file((file:File) => {
			this.validateFile(file);
		})
	}
  }

  validateFile(file:File):void {
	if(file.name.split('.')[1] != 'xlsx') {
		this.notification.error('Invalid file format!');
		return;
	}

	if(file.size > 500000) {
		this.notification.error('File too large!');
		return;
	}

	this.formatXLSXToArray(file);
  }
  
  formatXLSXToArray(file:File) {
	let reader = new FileReader();
	let workbook;
	reader.onloadend = e => {
		// extracting the names from the uploaded excel file
		let result = reader.result as ArrayBuffer;
		let data = new Uint8Array(result);
		workbook = XLSX.read(data, {type:'array'});
		let sheetName = workbook['SheetNames'][0];
		if(this.generateNames(workbook['Sheets'][sheetName])) {
			this.fileName = this.formatName(file.name);
			this.fileUpoaded = !this.fileUpoaded;
			this.detail.fileUploaded = true;
		}
	};	
	reader.readAsArrayBuffer(file);
  }
  
  formatName(name:string):string {
	if(name.length > 25) {
		this.detail.fileName = name.slice(0,23) + '...';
		return name.slice(0,23) + '...';		
	}

	this.detail.fileName = name;
	return name;
  }

  removeFile():void {
	  this.fileName = '';
	  this.fileUpoaded = !this.fileUpoaded;
	  this.detail.clear();
  }

  begin() {
	this.router.navigate(['/dashboard']);
	this.detail.createDataStructure();
  }

  generateNames(sheet:any):boolean {
	let records:any[] = Object.values(sheet);
	let start = records[0].split(':')[0];
	let end = records[0].split(':')[1];

	if(start.slice(0,1) != end.slice(0,1)) {
		this.notification.error('Excel sheet must be single columned!');
		return false;
	}

	this.detail.names = records.map(record => {
		if(record.hasOwnProperty('v')) {
			return record['v'].trim();
		}
	}).filter(name => {
		if(name != 'name' && name != 'undefined') {
			return name;
		}
	});
	return true;
  }
}
