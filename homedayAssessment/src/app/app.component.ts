import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './service/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'Home Day Assessment';
  routerDictionary = ['/home', '/user', '/user-terms', '/user-details'];
  disableBackNavigation = true;
  disableForwardNavigation = false;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.broadcastFormValidity$.subscribe((data) => {
      this.disableForwardNavigation = this.router.url === '/' ? false : data;
    });
  }

  applyDisableClass(src: string) {
    this.disableForwardNavigation = src === '/user-details';
    this.disableBackNavigation = src === '/home';
  }

  /**
   * Move Forward Navigation
   */
  forwardNavigation() {
    const navigateNextURL = this.getNavigationURLDetails(true);
    this.applyDisableClass(navigateNextURL);
    this.disableForwardNavigation = true;
    this.router.navigate([navigateNextURL]);
  }
  /**
   * Move Back Navigation
   */
  backNavigation() {
    const navigateBackURL = this.getNavigationURLDetails(false);
    this.applyDisableClass(navigateBackURL);
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
}
