import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser, IUserGitDetails, IUserInfo } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  passFormValidity$ = new Subject<boolean>();
  broadcastFormValidity$ = new Subject<boolean>();

  userInformation: IUser = {
    userDetails: {
      githubUserName: '',
      firstName: '',
      lastName: '',
    },
    userAgreement: {
      userEmail: '',
      termsAndCondition: false,
    },
  };
  constructor(private http: HttpClient) {
    this.userFormStatus();
  }

  userFormStatus() {
    this.passFormValidity$.subscribe((data) => {
      this.broadcastFormValidity$.next(data);
    });
  }

  saveUserDetails(data: IUserInfo) {
    this.userInformation.userDetails = data;
  }
  getUser() {
    const userName = this.userInformation.userDetails.githubUserName;
    return this.http.get<IUserGitDetails>(
      `https://api.github.com/users/${userName}`
    );
  }
}
