import { Component, Input} from '@angular/core';
import { SubMenu } from '../demo/interface/submenu';
import { LayoutService } from './service/app.layout.service';



@Component({
  selector: 'app-submenu',
  templateUrl: './app.submenu.component.html',
  styles:[`
    .active{
      @apply  opacity-100 border-primary md:border-b-0 ;    
    }
    .active div{
      @apply visible block opacity-100 pointer-events-auto;
    }
  `]
})
export class SubmenuComponent {
  subMenu: SubMenu | null | undefined;
  isSubmenuOn: boolean | undefined;
  @Input() subMenuType!: string;
  constructor(public layoutService: LayoutService) {
  }
  ngOnInit(){
    this.layoutService.currentSubMenuState.subscribe(state => this.isSubmenuOn = state);
    this.subMenu = this.layoutService.getSubmenuList(this.subMenuType);
  }
}