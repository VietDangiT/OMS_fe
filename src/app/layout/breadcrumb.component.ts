import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
export interface IBreadCrumb {
  label: string;
  url: string;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent {
  readonly home = { label: 'Home', url: '/', target: '_self' };

  menuItems: MenuItem[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((routeData) => {
      console.log(routeData['breadcrumbs']);

      this.createBreadCrumb(routeData);
    });
  }

  createBreadCrumb(routeData: Data) {
    var breadcrumbs = routeData['breadcrumbs'];
    var url: string = '';
    breadcrumbs.forEach((route: string) => {
      //create URL (split by ' ' space and join by '-')
      url += route.toLowerCase().split(' ').join('-') + '/';

      // push new breadcrumb element into meunItem array
      this.menuItems.push({
        label: route,
        routerLink: `/${url}`,
        target: '_self',
      });
    });
  }
}
