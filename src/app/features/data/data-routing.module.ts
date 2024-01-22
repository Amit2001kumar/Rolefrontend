import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';

import { AddUserComponent } from './components/add-user/add-user.component';
import { UserGetComponent } from './components/user-get/user-get.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';

const routes: Routes = [
  {
    path: '',
   
    component: MainComponent,
    children: [
      { path: 'adduser', component: AddUserComponent },
      { path: 'getdata', component: UserGetComponent },
      { path: 'edituser/:id', component: EditUserComponent },

      { path: 'role', component: RoleManagementComponent },
      { path: '', redirectTo: '/adduser', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
