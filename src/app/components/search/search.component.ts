import { Component, OnInit } from '@angular/core';

import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  data = this.detail.data;
  results = [];
  emptySearch:boolean = true;
  searchTerm:string;
  emptyResults:boolean = false;
  constructor(private detail:DetailService) { }

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

}
