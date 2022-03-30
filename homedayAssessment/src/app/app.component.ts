import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from './service/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Home Day Assessment';
  routerDictionary = ['/home', '/user', '/user-terms', '/user-details'];
  disableBackNavigation = true;
  disableForwardNavigation: boolean;
  formValiditySubscription = Subscription.EMPTY;
  constructor(
    private dataService: DataService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formValiditySubscription =
      this.dataService.broadcastFormValidity$.subscribe(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        const userTerms = JSON.parse(localStorage.getItem('userTerms'));

        if (this.router.url === this.routerDictionary[1]) {
          this.setForwardNavigationStatus(userInfo);
        }
        if (this.router.url === this.routerDictionary[2]) {
          this.setForwardNavigationStatus(userTerms);
        }
      });
  }

  /**
   * Disable Forward Navigation based on Storage
   */
  setForwardNavigationStatus(userInformation) {
    this.disableForwardNavigation = userInformation ? false : true;
    this.cdr.detectChanges();
  }
  /**
   * Move Forward Navigation
   */
  forwardNavigation() {
    const navigateNextURL = this.getNavigationURLDetails(true);
    this.disableBackNavigation = false;
    this.disableForwardNavigation = navigateNextURL === '/user-details';
    this.router.navigate([navigateNextURL]);
  }
  /**
   * Move Back Navigation
   */
  backNavigation() {
    const navigateBackURL = this.getNavigationURLDetails(false);
    this.disableBackNavigation = navigateBackURL === '/home';
    this.router.navigate([navigateBackURL]);
  }
  /**
   * Get Navigation Route Name
   */
  getNavigationURLDetails(isNext: boolean) {
    const currentRouteIndex = this.routerDictionary.findIndex(
      (currentRouteName) => currentRouteName === this.router.url
    );
    const getNavigationRoute = isNext
      ? this.routerDictionary[currentRouteIndex + 1]
      : this.routerDictionary[currentRouteIndex - 1];
    return currentRouteIndex > -1
      ? getNavigationRoute
      : this.routerDictionary[0];
  }

  ngOnDestroy(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userTerms');
    this.formValiditySubscription.unsubscribe();
  }
}
