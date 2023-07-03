import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-card',
  templateUrl: './inventory-card.component.html',
  styleUrls: ['./inventory-card.component.scss'],
})
export class InventoryCardComponent implements OnInit {
  @Input() displayText: string = '';
  @Input() value: number = 0;
  constructor() {}
  ngOnInit() {
    this.displayText = this.displayText
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (str) {
        return str.toLocaleUpperCase();
      });
    this.displayText = `${this.displayText}`;
  }
}
