import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService, Task } from '../services/data.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  public task: Task;
  isUpdate: boolean = false

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.task = {
      id: -1,
      name: '',
      isDone: false,
      createdOn: new Date(),
      modifiedOn: new Date()
    };
    this.isUpdate = false
    
    const idStr = this.activatedRoute.snapshot.paramMap.get('id');
    let id = parseInt(idStr);
    if(id!=null && id!=undefined && !isNaN(id)){
      this.isUpdate = true;
      this.data.getTaskById(id).subscribe(res=>{
        if(res.success){
          this.task = res.task;
        }
      });
    }
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Tasks' : '';
  }

  createTask(){
    if(!this.isValidTask()){
      return;
    }
    this.data.createTask(this.task).subscribe(res=>{
      if(res.success){
        this.router.navigate(['']);
      }
    })
  }

  updateTask(){
    if(!this.isValidTask()){
      return;
    }
    this.data.updateTask(this.task).subscribe(res=>{
      if(res.success){
        this.router.navigate(['']);
      }
    })
  }

  isValidTask(): boolean{
    this.task.name = this.task.name.trim();
    if(this.task.name.length==0){
      this.showMessage('Please provide task name');
      return false;
    }
    return true;
  }

  cancel(){
    this.router.navigate(['']);
  }

  async showMessage(messageStr: string) {
    const toast = await this.toastController.create({
      message: messageStr,
      duration: 2000
    });
    toast.present();
  }
}
