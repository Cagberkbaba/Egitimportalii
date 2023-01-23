import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  


  users: any;
  userForm: FormGroup;
  listData: any;

  constructor(private authService: AuthService,private fb:FormBuilder ){
    this.listData = [];


    this.userForm = this.fb.group({
      name : ['', Validators.required],
      address : ['', Validators.required],
      timedate:['', Validators.required],
    })
  }

  public addItem() : void{
    this.listData.push(this.userForm.value);
    this.userForm.reset();

  }

  reset(){
    this.userForm.reset();
  }

  removeItem(element:any){
    this.listData.forEach((value:any,index:any) => {
      if(value=element)
      this.listData.splice(index,1);
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.authService.getAllUsers().subscribe(res => (this.users = res));

  }

  deleteUser(uid: number){}

  setAdmin(uid:number){
    this.authService.setAdmin(uid).subscribe((res) => {
      console.log('Yetki Verildi')
    })
  }

  logout(){
    this.authService.logout();
  }

}
