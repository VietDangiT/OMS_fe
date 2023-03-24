import { Component } from '@angular/core';

@Component({
    selector: 'app-total-sales',
    templateUrl: './total-sales.component.html',
    styleUrls: ['./total-sales.component.scss'],
})
export class TotalSalesComponent {
    chart: any;

    ngOnInit() {
        this.createChart();
    }

    createChart() {
        this.chart = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Total Sale',
                    backgroundColor: '#213969',
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
            ],
        };
    }
}
