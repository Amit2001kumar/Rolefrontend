import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGetComponent } from './features/data/components/user-get/user-get.component';
const routes: Routes = [
  {path:'getdata',component:UserGetComponent},

  {
    path: '',
    loadChildren: () => import('./features/data/data.module').then((m) => m.DataModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
