import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { tap } from 'rxjs';
import { User } from '../demo/components/login/models/login.models';
import { UserService } from '../demo/components/user/services/user.service';
import { AuthService } from '../demo/service/auth.service';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  titles: string | undefined;
  isNavbarOn: boolean | undefined;
  navbarState: boolean | undefined;

  routerLink = '/user/detail';

  user: Partial<User> = {
    avatar: '',
    dob: '',
    gender: '',
    fullAddress: '',
    email: '',
    fullName: '',
    phoneNumber: '',
  };

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.layoutService.currentNavbarState.subscribe(
      state => (this.isNavbarOn = state)
    );

    this.titles = this.route.snapshot.data['title'];

    this.initUser();
  }

  initUser(): void {
    this.userService
      .getUser()
      .pipe(
        tap(res => {
          let { userDetail: user } = res;

          user = this.userService.refactorUser(user);

          this.user = user;
        })
      )
      .subscribe();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
