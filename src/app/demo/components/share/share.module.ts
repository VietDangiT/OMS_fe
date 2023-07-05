import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ColorMarkerComponent } from './color-marker/color-marker.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { FieldsetHeaderComponent } from './fieldset-header/fieldset-header.component';
import { GlobalFilterComponent } from './global-filter/global-filter.component';
import { InformationCardComponent } from './infomation-card/information-card.component';
import { OMSChartComponent } from './oms-chart/oms-chart.component';
import { OmsTableComponent } from './oms-table/oms-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ScreenFilterComponent } from './screen-filter/screen-filter.component';

@NgModule({
  declarations: [
    OMSChartComponent,
    OmsTableComponent,
    PaginationComponent,
    GlobalFilterComponent,
    ScreenFilterComponent,
    InformationCardComponent,
    FieldsetHeaderComponent,
    ColorMarkerComponent,
  ],
  imports: [
    DateFilterComponent,
    CommonModule,
    ChartModule,
    NgApexchartsModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    SkeletonModule,
    ReactiveFormsModule,
    CalendarModule,
    AvatarModule,
  ],
  exports: [
    OMSChartComponent,
    DateFilterComponent,
    OmsTableComponent,
    GlobalFilterComponent,
    ScreenFilterComponent,
    InformationCardComponent,
    FieldsetHeaderComponent,
    ColorMarkerComponent,
  ],
})
export class ShareModule {}
