import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

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
  isSubmenuOn: boolean | undefined;
  navbarState: boolean | undefined;

    constructor(public layoutService: LayoutService, private route:ActivatedRoute) { }
    
    ngOnInit(){
        this.layoutService.currentSubMenuState.subscribe(state => this.isSubmenuOn = state);
        this.titles = this.route.snapshot.data['title'];
    }
}
