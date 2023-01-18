import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { GuardAuthenticationGuard } from './guard/guard-authentication.guard';
import { ForgotPassComponent } from './components/user/forgot-pass/forgot-pass.component';

const routes: Routes = [{path:"", component:HomeComponent},
{path:"home", component:HomeComponent},
{path:"profile/:name", component:ProfileComponent},
{path:"edit-profile/:id", component:EditProfileComponent, canActivate:[GuardAuthenticationGuard]},
{path:'login', component:LoginComponent},
{path:'register', component:RegisterComponent},
{path:"forgot-pass", component:ForgotPassComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
