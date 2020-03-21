import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DetailService } from '../../services/detail.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  data = this.detail.data;
  addForm:FormGroup;

  constructor(private detail:DetailService, private notif:NotificationService, private fb:FormBuilder) { }

  ngOnInit() {
	  this.createFormGroup();
  }

  createFormGroup():void {
	this.addForm = this.fb.group({	
		name:['', [Validators.required, Validators.minLength(5)]]
	})
  }

  submit(form:FormGroup):void {
	  let name = form.get('name').value;

	  let row = {name:name, status:true};
	  this.data.push(row);
	  form.get('name').setValue('');
	  this.notif.success('Added successfully!');
  }

}
