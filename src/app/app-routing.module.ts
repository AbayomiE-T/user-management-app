import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'create', component: AddUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
