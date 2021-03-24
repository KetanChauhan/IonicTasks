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

export interface TaskResponse {
  success: boolean;
  task: Task;
}

export interface OperationResponse{
  success: boolean,
  insertedId: number,
  successMessage: String,
  errorMessage: String
}

const baseUrl = "https://ketan-node-tasks.herokuapp.com";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'})
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    
  }

  public getTasks(): Observable<TasksResponse> {
      return this.http.get<TasksResponse>(baseUrl + '/task');
  }

  public getTaskById(id: number): Observable<TaskResponse> {
      return this.http.get<TaskResponse>(baseUrl + '/task/'+id);
  }

  public createTask(task: Task): Observable<OperationResponse>{
    return this.http.put<OperationResponse>(baseUrl + '/task',JSON.stringify(task),httpOptions);
  }

  public updateTask(task: Task): Observable<OperationResponse>{
    return this.http.post<OperationResponse>(baseUrl + '/task',JSON.stringify(task),httpOptions);
  }

  public deleteTask(task: Task): Observable<OperationResponse>{
    return this.http.delete<OperationResponse>(baseUrl + '/task/' + task.id);
  }


  public messages: Message[] = [
    {
      fromName: 'Ketan Chauhan',
      subject: 'First ioinc app',
      date: '9:32 AM',
      id: 0,
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
