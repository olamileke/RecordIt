import { Component, OnInit, ViewChildren, QueryList, Renderer2 } from '@angular/core';

import { DetailService } from '../../services/detail.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  @ViewChildren('statusIcon') statusIcons:QueryList<any>;
  data = this.detail.data ;
  constructor(private detail:DetailService, private renderer:Renderer2, private notif:NotificationService) { }

  ngOnInit() {
  }

  changeStatus(index:number) {
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
	}
	this.data[index]['status'] = !this.data[index]['status'];
  }
}
