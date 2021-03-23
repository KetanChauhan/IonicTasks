import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

export interface Task {
  id: number;
  name: string;
  isDone: boolean;
  createdOn: Date;
  modifiedOn: Date;
}

export interface TasksResponse {
  success: boolean;
  tasks: Task[];
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
const baseUrl = "https://ketan-node-tasks.herokuapp.com";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tasks: Task[] = [];

  constructor(private http: HttpClient) {
    
    this.http.get<TasksResponse>(baseUrl + '/task').subscribe(res=>{
      console.log('tasks ',res);
      if(res.success) this.tasks = res.tasks;
    });
  }

  public getTasks(): Task[] {
      return this.tasks;
  }

  public getTaskById(id: number): Task {
      return this.tasks.find(t=>t.id==id);
  }




  public messages: Message[] = [
    {
      fromName: 'Ketan Chauhan',
      subject: 'First ioinc app',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: 'Ionic',
      subject: 'Hybrid app',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Netlify',
      subject: 'Deploy',
      date: '4:55 AM',
      id: 2,
      read: false
    },
    {
      fromName: 'Holiday',
      subject: 'Enjoy everyday!!!',
      date: 'Yesterday',
      id: 3,
      read: false
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false
    }
  ];

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }
}
