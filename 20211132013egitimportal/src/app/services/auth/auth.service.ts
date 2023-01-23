import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private httpClient: HttpClient) {}

  async signIn(email: string, password: string) {
    return await this.firebaseAuth
      .signInWithEmailAndPassword(email,password)
      .then((res) => {
        this.lsSetItem('user', JSON.stringify(res.user));
        this.router.navigate(['/'])
      });
  }

  async signUp(email: string, password: string){
    return await this.firebaseAuth
      .createUserWithEmailAndPassword(email,password)
      .then((res) => {
        this.lsSetItem('user', JSON.stringify(res.user));
        this.router.navigate(['/'])
      })
  }

  getAllUsers(){
    return this.httpClient.get('http://localhost:3000');
  }

  setAdmin(uid: number){
    return this.httpClient.post('http://localhost:3000/setAdmin', { uid });
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.clear();
    this.router.navigate(['/auth'])
  }




  lsSetItem(key: string, body: string){
    localStorage.setItem(key , body)
  }

  lsGetItem(key:string){
    return JSON.parse(localStorage.getItem(key) || '{}');
  }
}