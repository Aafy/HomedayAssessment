import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserTermsComponent } from './user-terms/user-terms.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: WelcomeComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user-terms',
    component: UserTermsComponent,
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
  },
  {
    path: '**',
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
