import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewTaskComponent } from './view-task.component';

import { IonicModule } from '@ionic/angular';

import { ViewTaskPageRoutingModule } from './view-task-routing.module';
import { CreateTaskComponent } from './create-task.component';
import { HomePageModule } from '../home/home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTaskPageRoutingModule,
    HomePageModule
  ],
  declarations: [ViewTaskComponent,CreateTaskComponent]
})
export class ViewTaskPageModule {}
