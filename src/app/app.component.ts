import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  formArrayName = 'editabletable';
  form: FormGroup;
  columnsArr: any[] = [];
  Object = Object;
  merchentStoreData = [
    { 'Merchant name': 'SDU1', 'Acquirer code': '001' },
    { 'Merchant name': 'SDU2', 'Acquirer code': '002' },
    { 'Merchant name': 'SDU3', 'Acquirer code': '003' },
    { 'Merchant name': 'SDU4', 'Acquirer code': '004' },
    { 'Merchant name': 'SDU5', 'Acquirer code': '005' },
    { 'Merchant name': 'SDU6', 'Acquirer code': '006' },
    { 'Merchant name': 'SDU7', 'Acquirer code': '007' },
  ];

  constructor(private fb: FormBuilder) {
    const obj = {};
    obj[`${this.formArrayName}`] = this.fb.array([]);
    this.form = this.fb.group(obj);
  }

  ngOnInit() {
    this.getHeader();
    this.employees().controls.unshift(this.newEmployee());
    this.setDataToTable(this.merchentStoreData);
  }

  setDataToTable(merchentStoreData) {
    merchentStoreData.forEach((item, i) => {
      const dataObj = {};
      Object.keys(item).some((x) => {
        dataObj[x] = item[x];
      });
      const fbGroup = this.fb.group(dataObj);
      fbGroup.disable();
      this.employees().push(fbGroup);
    });
  }

  getHeader() {
    (
      Object.keys(
        this.merchentStoreData[0]
      ) as (keyof typeof this.merchentStoreData[0])[]
    ).forEach((key, index) => {
      this.columnsArr.push(key);
    });
  }

  employees(): FormArray {
    return this.form.get(`${this.formArrayName}`) as FormArray;
  }

  newEmployee(): FormGroup {
    const headerObj = {};
    this.columnsArr.forEach((header) => {
      headerObj[header] = new FormControl('', [Validators.required]);
    });

    return this.fb.group(headerObj);
  }

  addEmployee(employee) {
    if (employee.invalid) {
      return false;
    }
    this.employees().controls.unshift(this.newEmployee());
    employee.disable();
  }

  removeEmployee(index: number) {
    this.employees().removeAt(index);
  }

  editEmployee(index: number) {
    this.employees()['controls'][0].setValue(
      this.employees()['controls'][index].value
    );

    this.removeEmployee(index);
  }

  addNewCheck(ctrl): boolean {
    // console.log(ctrl.status);
    const dataObj = ctrl.getRawValue();
    const values = Object.keys(dataObj).map((key) => dataObj[key]);
    return values.includes('') || ctrl.status === 'VALID';
  }
}
