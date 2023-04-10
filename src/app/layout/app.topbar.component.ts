import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../demo/service/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    titles: string | undefined;
     isNavbarOn: boolean | undefined;
    navbarState: boolean | undefined;

    constructor(public layoutService: LayoutService, private authService: AuthService, private route:ActivatedRoute, private router : Router) { }
    
    ngOnInit(){
        this.layoutService.currentNavbarState.subscribe(state => this.isNavbarOn = state);
        this.titles = this.route.snapshot.data['title'];
    }

    logOut(){
        this.authService.logout();
        this.router.navigate(["login"]);
    }
}
