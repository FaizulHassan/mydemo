import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './views/user/signup/signup.component';
import { SigninComponent } from './views/user/signin/signin.component';
import { HeaderComponent } from './views/home/header/header.component';
import { UserProfileComponent } from './views/user/user-profile/user-profile.component';
import { AuthGuard } from './authguard/auth.guard';
import { HomeComponent } from './views/post-login/dashboard/home/home.component';

const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: SigninComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard], children: [{
      path: 'user-profile' , component: UserProfileComponent
    }]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
