import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-assignment-app';
  isExcelFile: boolean;
  keys: string[];
  dataSheet = [];

  onFileUpload(event) {
    console.log(event);
    let data;
    this.isExcelFile = !!event.target.files[0].name.match(/(.xls|.xlsx|.csv)/);

    if (this.isExcelFile) {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };

      reader.readAsBinaryString(event.target.files[0]);

      reader.onloadend = e => {
        this.keys = Object.keys(data[0]);
        this.dataSheet = data;
      };
    }
  }

  applyFilter() {
    let input;
    let filter;
    let table;
    let tr;
    let td;

    let txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    for (const row of tr) {
      td = row.getElementsByTagName('td')[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      }
    }
  }
}
