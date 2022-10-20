import { Component, OnInit, OnChanges, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSharedService } from 'src/app/shared/services/data-shared.service';
import { Subscription } from 'rxjs';
import { IMessage } from '../home/models/IMessage';

@Component({
  selector: 'app-urmessage',
  template: `
    <div *ngIf="telInfo?.sender" [label]="dispositivo">
      <!-- <h1>{{ sender }}</h1> -->
      <h1 color="primary"> {{telInfo?.sender}} </h1>
    </div>
    <div>
      <p> {{telInfo?.text}} </p>
      <span color="medium"> {{telInfo?.timestamp}} </span>
    </div>

  `,
  styleUrls: ['./urmessage.component.scss'],
})
export class UrmessageComponent implements OnInit, OnChanges {

  subscription: Subscription = new Subscription();
  telInfo: IMessage | undefined;
  @Input() label: string;

  constructor(http: HttpClient, public datatel: DataSharedService) { }

  ngOnChanges(): void { }

  ngOnInit(): void {
    console.log(this.label)
    this.subscription.add(
      this.datatel.message$.subscribe(res => {
        if (res.sender === this.label) {
          this.telInfo = res;
        }
      })
    )
  }

  ngOnDestroy(): void {
  // eslint-disable-next-line curly
  if (this.subscription) this.subscription.unsubscribe();
  }

}
