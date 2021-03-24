import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService, Task } from '../services/data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() refreshData: EventEmitter<any> = new EventEmitter();

  originalTaskStatus: boolean;

  constructor(
    private data: DataService,
    public alertController: AlertController,
    private router: Router) { 
    }

  ngOnInit() {
    this.originalTaskStatus = this.task.isDone;
  }

  performUpdateTask(){
    if(this.task.isDone==this.originalTaskStatus){
      return;
    }
    this.data.updateTask(this.task).subscribe(res=>{
      if(res.success){
        this.router.navigate(['']);
      }
    })
  }

  async performDeleteTask(event){
    event.stopPropagation();

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete task',
      message: 'Are you sure to delete task <strong>'+this.task.name+'</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary'
        }, {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.data.deleteTask(this.task).subscribe(res=>{
              if(res.success){
                this.router.navigate(['']);
                this.refreshData.emit(null);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
