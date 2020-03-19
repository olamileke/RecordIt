import { Component, OnInit } from '@angular/core';

import { DetailService } from '../../services/detail.service'

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  names = this.detail.names;
  constructor(private detail:DetailService) { }

  ngOnInit() {
  }

}
