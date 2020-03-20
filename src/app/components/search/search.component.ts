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
  constructor(private detail:DetailService) { }

  ngOnInit() {
  }

  find(name:any):void {
	this.results = [];
	name = name.toLowerCase();

	if(name == '') {
		return
	}

	this.results = this.data.filter( record => {
		if(record.name.toLowerCase().includes(name)) {
			return record;
		}
	});
  }

}
