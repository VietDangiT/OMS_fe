import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalFilterComponent } from './global-filter/global-filter.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { OMSChartComponent } from './oms-chart/oms-chart.component';
import { OmsTableComponent } from './oms-table/oms-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ScreenFilterComponent } from './screen-filter/screen-filter.component';
import { CalendarModule } from 'primeng/calendar';
import { InformationCardComponent as InformationCardComponent } from './infomation-card/information-card.component';
import { AvatarModule } from 'primeng/avatar';
import { FieldsetHeaderComponent } from './fieldset-header/fieldset-header.component';
import { ColorMarkerComponent } from './color-marker/color-marker.component';


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
    CalendarModule,
    AvatarModule
  ],
  exports: [
    OMSChartComponent, 
    DateFilterComponent, 
    OmsTableComponent, 
    GlobalFilterComponent, 
    ScreenFilterComponent, 
    InformationCardComponent,
    FieldsetHeaderComponent,
    ColorMarkerComponent
  ]

})
export class ShareModule {}
