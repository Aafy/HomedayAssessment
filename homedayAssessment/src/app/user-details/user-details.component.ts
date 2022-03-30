import { Component, OnInit } from '@angular/core';
import { IUserGitDetails } from '../models/user';
import { DataService } from '../service/github.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: IUserGitDetails;
  isLoading = true;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.dataService.getUser().subscribe(
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
}
