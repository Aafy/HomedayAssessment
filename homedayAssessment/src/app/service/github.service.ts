import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUser, IUserGitDetails, IUserInfo } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  passFormValidity$ = new Subject<boolean>();
  broadcastFormValidity$ = new BehaviorSubject<boolean>(true);
  test$ = new Subject<IUserInfo>();
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
    this.test$.next(data);
  }
  getUser() {
    const userName = this.userInformation.userDetails.githubUserName;
    return this.http.get<IUserGitDetails>(
      `https://api.github.com/users/${userName}`
    );
  }
}
