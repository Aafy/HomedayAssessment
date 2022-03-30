import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UserTermsComponent } from './user-terms.component';

describe('UserTermsComponent', () => {
  let component: UserTermsComponent;
  let fixture: ComponentFixture<UserTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [UserTermsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should observe to the valueChanges in the form and cascade the data to service', () => {
    component.userTermsForm.patchValue({
      email: 'test@gmail.com',
    });
    component.userTermsForm.valueChanges.subscribe(() => {
      expect(component.userTermsForm.invalid).toBeTruthy();
    });
  });

  it('should validate the form correctness', () => {
    component.userTermsForm.patchValue({
      userEmail: 'test@mock.com',
      termsAndCondition: true,
    });
    expect(component.userTermsForm.valid).toBeTruthy();
  });
});
