import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUserTerms } from '../models/user';
import { DataService } from '../service/github.service';

@Component({
  selector: 'app-user-terms',
  templateUrl: './user-terms.component.html',
  styleUrls: ['./user-terms.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserTermsComponent implements OnInit, OnDestroy {
  userTermsForm: FormGroup;
  userEmail = '';
  termsAndCondition = false;
  userTermsSubscription = Subscription.EMPTY;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initializeuserTermsForm();
    this.userTermsSubscription = this.userTermsForm.valueChanges.subscribe(
      (data) => {
        if (this.userTermsForm.valid) {
          localStorage.setItem('userTerms', JSON.stringify(data));
        }
        this.dataService.passFormValidity$.next(
          this.isFieldEmpty(data) && this.userTermsForm.invalid
        );
      }
    );
    const getUserTerms = JSON.parse(localStorage.getItem('userTerms'));
    if (getUserTerms) {
      this.userEmail = getUserTerms.userEmail;
      this.termsAndCondition = getUserTerms.termsAndCondition;
    }
  }

  initializeuserTermsForm() {
    this.userTermsForm = this.formBuilder.group({
      userEmail: [
        this.userEmail,
        Validators.compose([Validators.required, Validators.email]),
      ],
      termsAndCondition: [this.termsAndCondition, Validators.requiredTrue],
    });
  }

  isFieldEmpty(formValue: IUserTerms) {
    return formValue.userEmail === '' || formValue.termsAndCondition === false;
  }

  ngOnDestroy(): void {
    this.userTermsSubscription.unsubscribe();
  }
}
