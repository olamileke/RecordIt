import { Component, OnInit, ViewChildren, QueryList, Renderer2 } from '@angular/core';

import { DetailService } from '../../services/detail.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChildren('statusIcon') statusIcons:QueryList<any>;
  data = this.detail.data;
  results = [];
  emptySearch:boolean = true;
  searchTerm:string;
  emptyResults:boolean = false;

  constructor(private detail:DetailService, private renderer:Renderer2, private notif:NotificationService) { }

  ngOnInit() {
  }

  find(name:any):void {
	this.results = [];
	name = name.toLowerCase();
	this.emptySearch = false;
	this.emptyResults = false;
	this.searchTerm = name;

	if(name == '') {
		this.emptySearch = true;
		return
	}

	this.results = this.data.filter( record => {
		if(record.name.toLowerCase().includes(name)) {
			return record;
		}
	});

	this.results.length == 0 ? this.emptyResults = true : this.emptyResults = false;	
  }

  changeStatus(name:string, index:number) {
	let currentStatus = false;
	let element = this.statusIcons['_results'][index].nativeElement;
    if(element.classList.contains('fa-times-circle')) {
		this.renderer.removeClass(element, 'fa-times-circle');
		this.renderer.addClass(element, 'fa-check-circle');
		this.notif.success("Marked present!");
	}
	else {
		this.renderer.removeClass(element, 'fa-check-circle');
		this.renderer.addClass(element, 'fa-times-circle');
		this.notif.success("Marked absent!");
		currentStatus = true;
	}

	let idx = this.detail.data.findIndex(record => record.name == name)
	this.detail.data[idx].status = !this.detail.data[idx].status;
  }

}
