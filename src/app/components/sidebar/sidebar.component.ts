import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  @Output() changeTab = new EventEmitter();
  tabs = {all:true, search:false, compile:false, add:false, absent:false};
  date = this.detail.getDateNum();
  constructor(private detail:DetailService) { }

  ngOnInit() {
  }

  emitChangeTab(tab:string):void {
	for(let tab in this.tabs) {
		this.tabs[tab] = false;
	}

	this.tabs[tab] = true;
	this.changeTab.emit(tab);
  }

}
