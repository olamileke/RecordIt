import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('file') file;

  constructor() { }

  ngOnInit() {
  }

  browse():void {
    this.file.nativeElement.click();
  }

}
