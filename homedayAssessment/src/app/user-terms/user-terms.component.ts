import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/github.service';

@Component({
  selector: 'app-user-terms',
  templateUrl: './user-terms.component.html',
  styleUrls: ['./user-terms.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserTermsComponent implements OnInit {
  userTermsForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initializeuserTermsForm();
    this.userTermsForm.valueChanges.subscribe(() => {
      this.dataService.passFormValidity$.next(this.userTermsForm.invalid);
    });
  }

  initializeuserTermsForm() {
    this.userTermsForm = this.formBuilder.group({
      userEmail: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      termsAndCondition: [false, Validators.requiredTrue],
    });
  }
}
