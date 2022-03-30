import { TestBed, } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DataService } from './github.service';
import { IUserInfo } from '../models/user';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save the user details ', () => {
    const userDetails: IUserInfo = {
      firstName: 'Angular',
      lastName: 'Blog',
      githubUserName: 'angular',
    };
    service.saveUserDetails(userDetails);
    expect(service.userInformation.userDetails).toEqual(userDetails);
  });
  it('should pass the form validity', () => {
    service.passFormValidity$.next(true);
    service.passFormValidity$.subscribe((data) => {
      expect(data).not.toBeNull();
    });
  });
});
