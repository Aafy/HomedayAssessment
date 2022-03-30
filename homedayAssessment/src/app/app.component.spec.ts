import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
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
    expect(component.disableForwardNavigation).toBeTruthy();
  });
  it('should cover back navigation flow', () => {
    component.backNavigation();
    expect(component.disableBackNavigation).toBeTruthy();
  });
});
