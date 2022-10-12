/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMessage } from 'src/app/features/home/models/IMessage';
import { IStatus } from 'src/app/features/home/models/IStatus';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  private statusSubject = new Subject<IStatus>();
  private messageSubject = new Subject<IMessage>();

  public status$ = this.statusSubject.asObservable();
  public message$ = this.messageSubject.asObservable();



  constructor() { }

  refreshData(message: IMessage | null, status: IStatus | null){
    if (message != null) {
      this.messageSubject.next(message);
    }

    if (status != null) {
      this.statusSubject.next(status);
    }

  }

}
