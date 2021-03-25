import { Component } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { DataService, Message, Task } from '../services/data.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks : Task[] = [];
  showingTasks : Task[] = [];
  isLoading: boolean = true;
  searchTerm: string = '';

  constructor(
    private data: DataService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet) {

      console.log('constructor');
      this.platform.backButton.subscribeWithPriority(-1, () => {
        if (!this.routerOutlet.canGoBack()) {
          Plugins.App.exitApp();
        }
      });
  }
  
  ionViewWillEnter() {
    this.refreshData();
  }

  refresh(ev) {
    this.data.getTasks().subscribe(res=>{
      if(res.success){
        this.tasks = res.tasks;
        this.showingTasks = this.tasks;
        this.isLoading = false;
        this.searchTerm = '';
      }
      ev.detail.complete();
    });
  }

  refreshData() {
    console.log('refreshData');
    this.data.getTasks().subscribe(res=>{
      if(res.success){
        this.tasks = res.tasks;
        this.showingTasks = this.tasks;
        this.isLoading = false;
        this.searchTerm = '';
      }
    });
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getTasks(): Task[] {
    return this.showingTasks;
  }

  performSearch(val: string){
    val = val.trim().toLocaleLowerCase();
    console.log('search ',val);
    if(val==null || val==undefined || val.length==0){
      this.showingTasks = this.tasks;
    }else{
      this.showingTasks = this.tasks.filter(t=>{
        if(t.name.toLocaleLowerCase().includes(val)){
          return true;
        }
        return false;
      })
    }
  }

}
