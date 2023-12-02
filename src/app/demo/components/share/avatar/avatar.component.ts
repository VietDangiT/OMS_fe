import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'oms-avatar',
  standalone: true,
  imports: [CommonModule, AvatarModule, SkeletonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() imgSrc: string;

  @Input() shape = 'square';

  @Input() label = 'user-avt.alt';

  @Input() size = 'normal' || 'large' || 'xlarge';

  @Input() style = '';

  @Input() styleClass = '';

  isLoading = true;

  ngOnChanges(changes: SimpleChanges): void {
    this.imgSrc = changes['imgSrc']?.currentValue;

    this.isLoading = false;
  }
}
