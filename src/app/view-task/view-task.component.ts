import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task } from '../services/data.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  @Input() task: Task;

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Tasks' : '';
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
