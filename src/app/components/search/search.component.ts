import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

import { DetailService } from '../../services/detail.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('statusIcon') statusIcon;
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

  changeStatus(index:number) {
    if(this.statusIcon.nativeElement.classList.contains('fa-times-circle')) {
		this.renderer.removeClass(this.statusIcon.nativeElement, 'fa-times-circle');
		this.renderer.addClass(this.statusIcon.nativeElement, 'fa-check-circle');
		this.notif.success("Marked present!");
	}
	else {
		this.renderer.removeClass(this.statusIcon.nativeElement, 'fa-check-circle');
		this.renderer.addClass(this.statusIcon.nativeElement, 'fa-times-circle');
		this.notif.success("Marked absent!");
	}
	this.data[index]['status'] = !this.data[index]['status'];
  }

}
