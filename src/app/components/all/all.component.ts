import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

import { DetailService } from '../../services/detail.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  @ViewChild('statusIcon') statusIcon
  data = this.detail.data ;
  constructor(private detail:DetailService, private renderer:Renderer2, private notif:NotificationService) { }

  ngOnInit() {
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
