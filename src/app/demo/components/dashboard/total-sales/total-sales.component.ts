import { Component, ViewEncapsulation } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
    selector: 'app-total-sales',
    templateUrl: './total-sales.component.html',
    styleUrls: ['./total-sales.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TotalSalesComponent {
    chartData: any;
    basicOptions!: ChartOptions;
    ngOnInit() {
        this.createChart();
    }

    createChart() {
        this.chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Total Sale',
                    backgroundColor: '#213969',
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
            ]
        };
        this.basicOptions = {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1
        }
    }
}
