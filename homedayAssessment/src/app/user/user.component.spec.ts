import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [UserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the form validity to the service ', () => {
    component.userForm.patchValue({
      firstName: 'Mock',
    });
    expect(component.userForm.valid).toBeFalsy();

    component.userForm.patchValue({
      firstName: 'Mock',
      lastName: 'User',
      githubUserName: 'b',
    });
    expect(component.userForm.valid).toBeTruthy();
  });
});
