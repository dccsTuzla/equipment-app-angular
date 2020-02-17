import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEquipment, IEmployee, IEquipmentType, IManufacturer } from 'src/app/types';
import EquipmentService from 'src/app/services/equipment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export default class ManageComponent implements OnInit {

  equipment: IEquipment;

  employees: IEmployee[];
  equipmentTypes: IEquipmentType[];
  manufacturers: IManufacturer[];

  form = new FormGroup({
    id: new FormControl(undefined),
    employeeId: new FormControl('', Validators.required),
    manufactorId: new FormControl('', Validators.required),
    equipmentTypeId: new FormControl('', Validators.required),
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
      this.equipment = data.equipment;

      if (data.equipment) {
        this.form.setValue({
          id: this.equipment.id,
          employeeId: this.equipment.employeeId,
          manufactorId: this.equipment.manufactorId,
          equipmentTypeId: this.equipment.equipmentTypeId,
          model: this.equipment.model,
          serialNumber: this.equipment.serialNumber,
          invoiceDate: this.equipment.invoiceDate,
          guarantee: this.equipment.guarantee
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
      this.equipmentService.saveEquipment(this.form.value).subscribe(() => {
        this.router.navigate(['/equipment']);
        alert('data saved');
      });
    }
  }

  deleteEquipment() {
    this.equipmentService.deleteEquipment(this.equipment).subscribe(() => {
      this.router.navigate(['/equipment']);
      alert('data deleted');
    });
  }
}
