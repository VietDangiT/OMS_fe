import { Component, Input } from '@angular/core';

@Component({
  selector: 'oms-user-social',
  templateUrl: './user-social.component.html',
  styleUrls: ['./user-social.component.scss'],
})
export class UserSocialComponent {
  @Input() link = '';

  @Input() icon = '';

  prefixSocialLink = '';

  ngOnInit(): void {
    this.prefixLink();
  }

  prefixLink(): void {
    this.prefixSocialLink = this.link.split('/')[3];
  }
}
