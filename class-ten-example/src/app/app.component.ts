import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subject, Subscription} from 'rxjs';

import {ApiService} from './services/api.service';
import User from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  clicksCount = 0;
  usersSubscription: Subscription;

  private subject$ = new Subject();

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.subject$.subscribe(clicks => console.log(`Foram clicadas ${clicks} vezes`));

    this.usersSubscription = this.apiService.getUsers().subscribe((users: User[]) => console.log(users));
    // armazeno a subscription para dar unsubscribe dps
  }

  ngOnDestroy() {
    this.subject$.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

  onClick() {
    this.subject$.next(++this.clicksCount);
  }
}
