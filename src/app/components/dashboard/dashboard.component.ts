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

  date = this.detail.getDateString();
  displaySidebar:boolean = false;
  tabs = {all:true, search:false, add:false, compile:false}
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
	screen.width < 991 ? this.displaySidebar = !this.displaySidebar : this.displaySidebar = this.displaySidebar;
  }

  toggleSidebar():void {
	  this.displaySidebar = !this.displaySidebar;
  }

}
