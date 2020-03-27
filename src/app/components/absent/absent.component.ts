import { Component, OnInit } from '@angular/core';

import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-absent',
  templateUrl: './absent.component.html',
  styleUrls: ['./absent.component.css']
})
export class AbsentComponent implements OnInit {

  absentData = this.detail.getAbsent();
  constructor(private detail:DetailService) { }

  ngOnInit() {
  }

}
