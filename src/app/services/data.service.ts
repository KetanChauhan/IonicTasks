import { Injectable } from '@angular/core';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
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

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }
}
