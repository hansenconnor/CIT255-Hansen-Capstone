import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUploadComponent } from './user-upload/user-upload.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register' , component: RegisterComponent },
  { path: 'login' , component: UserLoginComponent },
  { path: ':username', component: UserProfileComponent },
  { path: ':username/upload', component: UserUploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
