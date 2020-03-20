import { Component, OnInit } from '@angular/core';

import { DetailService } from '../../services/detail.service'

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  data = this.detail.data;
  constructor(private detail:DetailService) { }

  ngOnInit() {
  }

}
