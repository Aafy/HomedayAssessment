import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DataService } from './service/github.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/user',
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService);

    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should redirect to home page when the desired route is unavailable ', () => {
    const getRouteName = component.getNavigationURLDetails(false);
    expect(getRouteName).toEqual('/home');
  });

  it('should cover forward navigation flow', () => {
    component.forwardNavigation();
    expect(component.disableBackNavigation).toBeFalsy();
  });
  it('should cover back navigation flow', () => {
    component.backNavigation();
    expect(component.disableBackNavigation).toBeTruthy();
  });

  it('should route to User and check for validity', () => {
    //  component.router.url = '/home';
    const router = TestBed.inject(Router);
    // @ts-ignore: force this private property value for testing.
    router.url = '/user-terms';
    service.broadcastFormValidity$.next(true);
    expect(component.disableForwardNavigation).toBeTruthy();
  });

  it('should route to User terms and check for validity', () => {
    const router = TestBed.inject(Router);
    // @ts-ignore: force this private property value for testing.
    router.url = '/user';
    service.broadcastFormValidity$.next(true);
    expect(component.disableForwardNavigation).toBeTruthy();
  });
});
