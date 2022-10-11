import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IChat } from './models/IChat';
import { DataSharedService } from 'src/app/shared/services/data-shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();


  constructor(public dataService: DataSharedService) {}

  ngOnInit(): void {

    this.subscription = this.dataService.chat$.subscribe((res) => {
      //relativo testo
    });

  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.subscription) {this.subscription.unsubscribe();}
  }

}
