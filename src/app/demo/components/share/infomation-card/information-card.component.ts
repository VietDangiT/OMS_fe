import { Component, Input } from '@angular/core';

@Component({
  selector: 'oms-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss']
})
export class InformationCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() srcImage: string = '';
  @Input() isImageUrl: boolean;
  @Input() label: string;
}
