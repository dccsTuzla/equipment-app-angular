import { Component, OnInit } from '@angular/core';
import EquipmentService from 'src/app/services/equipment.service';
import { IEquipment, IEquipmentType, IEmployee, IManufacturer } from 'src/app/types';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface IFilter {
  employeeId?: string;
  equipmentTypeId?: string;
  manufacturerId?: string;
}

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export default class OverviewComponent implements OnInit {
  public equipment: IEquipment[] = [];

  public filterForm = new FormGroup({
    employeeId: new FormControl(),
    equipmentTypeId: new FormControl(),
    manufacturerId: new FormControl()
  });

  constructor(
    private equipmentService: EquipmentService,
    private router: Router) {
  }

  ngOnInit() {
    this.equipmentService.getEquipment().subscribe((equipment) => {
      this.equipment = equipment;
    });
  }

  public getDistinctEquipmentTypes(): IEquipmentType[] {
    const equipmentTypes = this.equipment.map(x => x.equipmentType);
    return this.distinct(equipmentTypes, (x) => x.id);
  }

  public getDistinctEmployees(): IEmployee[] {
    const employees = this.equipment.map(x => x.employee);
    return this.distinct(employees, (x) => x.id);
  }

  public getDistinctManufacturers(): IManufacturer[] {
    const manufacturers = this.equipment.map(x => x.manufactor);
    return this.distinct(manufacturers, (x) => x.id);
  }

  public getFilteredEquipment() {
    const filter = this.filterForm.value as IFilter;

    return this.equipment.filter(e => {
      if (filter.employeeId && filter.employeeId !== String(e.employeeId)) {
        return false;
      } else if (filter.equipmentTypeId && filter.equipmentTypeId !== String(e.equipmentTypeId)) {
        return false;
      } else if (filter.manufacturerId && filter.manufacturerId !== String(e.manufactorId)) {
        return false;
      }

      return true;
    });
  }

  public editEquipment(equipment: IEquipment) {
    this.router.navigate(['/equipment', equipment.id]);
  }

  private distinct<T>(list: T[], accessor: (item: T) => string | number): T[] {
    return list.reduce((prev, item) => {
      if (prev.map(accessor).indexOf(accessor(item)) === -1) {
        prev.push(item);
      }

      return prev;
    }, []);
  }
}
