import { Component, OnInit } from '@angular/core';
import EquipmentService from 'src/app/services/equipment.service';
import { IEquipment, IEquipmentType, IEmployee, IManufacturer } from 'src/app/types';
import { Router } from '@angular/router';
import { FilterUtils } from 'primeng/utils'
import { EquipmentQuery } from 'src/app/store/equipment.store';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export default class OverviewComponent implements OnInit {
  public equipment: IEquipment[] = [];

  public distinctEquipmentTypes: IEquipmentType[] = [];
  public distinctEmployees: IEmployee[] = [];
  public distinctManufacturers: IManufacturer[] = [];

  constructor(
    private equipmentService: EquipmentService,
    private equipmentQuery: EquipmentQuery,
    private router: Router) {
  }

  ngOnInit() {
    if (this.equipmentQuery.getCount() === 0) {
      this.equipmentService.loadEquipment().subscribe();
    }

    this.equipmentQuery.selectAll().subscribe((equipment) => {
      this.equipment = equipment;

      const manufacturers = this.equipment.map(x => x.manufactor);
      this.distinctManufacturers = this.distinct(manufacturers, (x) => x.id);

      const employees = this.equipment.map(x => x.employee);
      this.distinctEmployees = this.distinct(employees, (x) => x.id);

      const equipmentTypes = this.equipment.map(x => x.equipmentType);
      this.distinctEquipmentTypes = this.distinct(equipmentTypes, (x) => x.id);
    });

    FilterUtils['equals-by-id'] = (value, filter): boolean => {
      return value.id === filter.id;
    };
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
