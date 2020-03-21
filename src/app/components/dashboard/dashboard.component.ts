import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DetailService } from '../../services/detail.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tabs = {all:true, search:false, compile:false}
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
  }

}
