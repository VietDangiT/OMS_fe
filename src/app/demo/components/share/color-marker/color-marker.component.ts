import { Component, Input } from '@angular/core';

@Component({
  selector: 'oms-color-marker',
  templateUrl: './color-marker.component.html',
  styleUrls: ['./color-marker.component.scss']
})
export class ColorMarkerComponent {
  @Input() colorClass: string;
}
