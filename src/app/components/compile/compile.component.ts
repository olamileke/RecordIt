import { Component, OnInit } from '@angular/core';

import { DetailService } from '../../services/detail.service';
  
@Component({
  selector: 'app-compile',
  templateUrl: './compile.component.html',
  styleUrls: ['./compile.component.css']
})
export class CompileComponent implements OnInit {

  presentData = this.detail.getPresent();
  constructor(private detail:DetailService) { }

  ngOnInit() {
  }

}
