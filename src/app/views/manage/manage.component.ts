import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee, IEquipmentType, IManufacturer, IEquipmentBase } from 'src/app/types';
import EquipmentService from 'src/app/services/equipment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { merge, forkJoin } from 'rxjs';

@Component({
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export default class ManageComponent implements OnInit {

  employees: IEmployee[];
  equipmentTypes: IEquipmentType[];
  manufacturers: IManufacturer[];

  form = new FormGroup({
    id: new FormControl(undefined),
    employee: new FormControl(undefined, Validators.required),
    manufactor: new FormControl(undefined, Validators.required),
    equipmentType: new FormControl(undefined, Validators.required),
    model: new FormControl('', Validators.required),
    serialNumber: new FormControl('', Validators.required),
    invoiceDate: new FormControl('', Validators.required),
    guarantee: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private equipmentService: EquipmentService
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      if (data.equipment) {
        this.form.setValue({
          id: data.equipment.id,
          employee: data.equipment.employee,
          manufactor: data.equipment.manufactor,
          equipmentType: data.equipment.equipmentType,
          model: data.equipment.model,
          serialNumber: data.equipment.serialNumber,
          invoiceDate: data.equipment.invoiceDate,
          guarantee: data.equipment.guarantee
        });
      }
    });

    this.equipmentService.getEmployees().subscribe((employees) => this.employees = employees);
    this.equipmentService.getEquipmentTypes().subscribe((equipmentTypes) => this.equipmentTypes = equipmentTypes);
    this.equipmentService.getManufacturers().subscribe((manufacturers) => this.manufacturers = manufacturers);
  }

  saveEquipment() {
    if (!this.form.valid) {
      alert('there are some mandatory fields not filled');
    } else {
      const data: IEquipmentBase = {
        id: this.form.value.id,
        employeeId: this.form.value.employee.id,
        equipmentTypeId: this.form.value.equipmentType.id,
        manufactorId: this.form.value.manufactor.id,
        serialNumber: this.form.value.serialNumber,
        model: this.form.value.model,
        invoiceDate: this.form.value.invoiceDate,
        guarantee: this.form.value.guarantee
      };

      this.equipmentService.saveEquipment(data).subscribe(() => {
        alert('data saved');
        this.router.navigate(['/equipment']);
      });
    }
  }

  deleteEquipment() {
    this.equipmentService.deleteEquipment(this.form.value.id).subscribe(() => {
      alert('data deleted');
      this.router.navigate(['/equipment']);
    });
  }
}
