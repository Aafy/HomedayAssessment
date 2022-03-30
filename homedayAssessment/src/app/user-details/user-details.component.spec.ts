import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IUserGitDetails } from '../models/user';
import { DataService } from '../service/github.service';
import { mergeMap } from 'rxjs/operators';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let dataService: DataService;
  const mockUser: IUserGitDetails = {
    name: 'Mock',
    created_at: '22-01-2022',
    login: 'angular',
    avatar_url: 'https://dummyUrl.com',
    blog: 'https:test.com',
    followers: 9,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the users from service', () => {
    spyOn(dataService, 'getUser').and.callFake(() => of(mockUser));
    component.getUserDetails();
    expect(component.isLoading).toBeFalsy();
    expect(component.user).toEqual(mockUser);
  });

  it('should make user as null if the username is not available in API', () => {
    spyOn(dataService, 'getUser').and.callFake(() =>
      of(1).pipe(
        mergeMap(() => {
          return throwError({
            message: 'Bad Request',
          });
        })
      )
    );
    component.getUserDetails();
    expect(component.isLoading).toBeFalsy();
    expect(component.user).toEqual(null);
  });
});
