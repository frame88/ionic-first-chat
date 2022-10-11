import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IChat } from 'src/app/features/home/models/IChat';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  private chatSubject = new Subject<IChat>();
  public chat$ = this.chatSubject.asObservable();



  constructor() { }

  refreshData(chat: IChat){
    if (chat != null) {
      this.chatSubject.next(chat);
    }
  }

}
