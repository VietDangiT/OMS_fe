import { Component, Input, ViewEncapsulation } from '@angular/core';
import { OmsTable } from '../model/oms-table';

@Component({
  selector: 'app-oms-table',
  templateUrl: './oms-table.component.html',
  styleUrls: ['./oms-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OmsTableComponent {
  @Input() table : OmsTable = {
    pageNumber: 0,
    pageSize: 0,
    totalRowCount: 0,
    data: {
      header: [],
      body: [
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
        {
          id: 1,
          name: 'tien',
          sex: 'male',
          old: 27,
          blabla: '123123'
        },
      ]
    }
  }
  first: number = 0;

  rows: number = 10;

  onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
  }
}
