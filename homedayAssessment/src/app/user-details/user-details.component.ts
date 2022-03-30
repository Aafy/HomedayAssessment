import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUserGitDetails } from '../models/user';
import { DataService } from '../service/github.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: IUserGitDetails;
  isLoading = true;
  userDataSubscription = Subscription.EMPTY;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userDataSubscription = this.dataService.getUser().subscribe(
      (data) => {
        this.user = data;
        this.isLoading = false;
      },
      (err) => {
        this.user = null;
        this.isLoading = false;
      }
    );
  }
  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }
}
