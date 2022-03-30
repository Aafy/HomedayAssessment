import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/github.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  userForm: FormGroup;

  firstName: string = '';
  lastName: string = '';
  gitUserName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.userForm.valueChanges.subscribe((data) => {
      if (this.userForm.valid) {
        this.dataService.saveUserDetails(data);
      }
      this.dataService.passFormValidity$.next(this.userForm.invalid);
    });
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      githubUserName: [this.gitUserName, Validators.required],
    });
  }
}
