import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dersekle',
  templateUrl: './dersekle.component.html',
  styleUrls: ['./dersekle.component.scss']
})
export class DersekleComponent implements OnInit {

  userForm : FormGroup
  constructor(private fb:FormBuilder){
    this.userForm = this.fb.group({
      name : ['', Validators.required],
      address : ['', Validators.required],
      timedate:['', Validators.required],
    })
  }
  
  ngOnInit(): void {
    
  }

}
