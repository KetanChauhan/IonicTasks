import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { DataService, Task } from '../services/data.service';
import { ViewTaskComponent } from '../view-task/view-task.component';

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
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
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

  async presentTaskDetails() {
    const modal = await this.modalController.create({
      component: ViewTaskComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'task': this.task
      }
    });
    return await modal.present();
  }

  async presentActionSheet(event) {
    event.stopPropagation();
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-action-sheet',
      buttons: [{
        text: 'Edit',
        icon: 'create',
        handler: () => {
          this.router.navigate(['/task/update/' + this.task.id]);
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.performDeleteTask(event);
        }
      }]
    });
    await actionSheet.present();
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
