import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUserInfo } from '../models/user';
import { DataService } from '../service/github.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;

  firstName: string = '';
  lastName: string = '';
  gitUserName: string = '';
  userFormSubscription = Subscription.EMPTY;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.userFormSubscription = this.userForm.valueChanges.subscribe((data) => {
      if (this.userForm.valid) {
        this.dataService.saveUserDetails(data);
        localStorage.setItem('user', JSON.stringify(data));
      }

      this.dataService.passFormValidity$.next(
        this.isFieldEmpty(data) && this.userForm.invalid
      );
    });
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.gitUserName = userData.githubUserName;
    }
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      githubUserName: [this.gitUserName, Validators.required],
    });
  }

  isFieldEmpty(formValue: IUserInfo) {
    return (
      formValue.firstName === '' ||
      formValue.lastName === '' ||
      formValue.githubUserName === ''
    );
  }
  ngOnDestroy() {
    this.userFormSubscription.unsubscribe();
  }
}
