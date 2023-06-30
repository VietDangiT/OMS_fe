import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'oms-avatar',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() imgSrc: string | SafeUrl;

  @Input() shape = 'square';

  @Input() label = 'user-avt.alt';

  @Input() size = 'normal' || 'large' || 'xlarge';

  @Input() style = '';

  @Input() styleClass = '';

  @Output() onImageError = new EventEmitter();

  imageError(e: Event): void {
    this.onImageError.emit(e);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.imgSrc = changes['imgSrc']?.currentValue;
  }
}
