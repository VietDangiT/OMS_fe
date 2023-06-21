import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'oms-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true,
  imports: [ProgressBarModule, CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent {
  private readonly service = inject(ProgressBarService);

  isShowProgressBar$ = this.service.progressBarSubject$;
}
