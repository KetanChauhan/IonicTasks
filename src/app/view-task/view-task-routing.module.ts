import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskComponent } from './create-task.component';

import { ViewTaskComponent } from './view-task.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateTaskComponent
  },
  {
    path: 'update/:id',
    component: CreateTaskComponent
  },
  {
    path: ':id',
    component: ViewTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTaskPageRoutingModule {}
