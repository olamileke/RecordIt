import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tabs = {all:true, search:false, compile:false}
  constructor() { }

  ngOnInit() {
  }

  switchTab(tab:string):void {
	for(let tab in this.tabs) {
		this.tabs[tab] = false;
	}

	this.tabs[tab] = true;
  }

}
