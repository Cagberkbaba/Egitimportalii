import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
   },
   {
    path: 'dersekle',
   loadChildren: () => import('./dersekle/dersekle.module').then((m) => m.DersekleModule)
   },
  {path: 'dashboard', 
  loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) },
  {path:'chat', component:ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
