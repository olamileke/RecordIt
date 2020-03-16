import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('file') fileInput;
  file:File;
  fileName:string;
  imgSelected = false;

  constructor(private notification:NotificationService, private router:Router) { }

  ngOnInit() {
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

	this.file = file;
	this.fileName = this.formatName(this.file.name);
	this.imgSelected = !this.imgSelected;
  }
  
  
  formatName(name:string):string {
	
	if(name.length > 25) {
		return name.slice(0,23) + '...';		
	}

	return name;
  }

  removeFile():void {
	  this.fileName = '';
	  this.imgSelected = !this.imgSelected;
  }

  begin() {
	this.router.navigate(['/dashboard']);
  }
}
