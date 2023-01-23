import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent{
  SignInForm: FormGroup;
  SignUpForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.SignInForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
    this.SignUpForm =this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  signIn(){
    this.authService.signIn(this.SignInForm.get('email')?.value,
    this.SignInForm.get('password')?.value
    );

  }


  signUp(){
    this.authService.signUp(this.SignUpForm.get('email')?.value,
    this.SignUpForm.get('password')?.value)
  }

}



