import { Component, OnInit } from '@angular/core';
import EquipmentService from 'src/app/services/equipment.service';
import { IEquipment, ISimpleValue } from 'src/app/types';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject, combineLatest, concat } from 'rxjs';
import { map } from 'rxjs/operators';

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
  public readonly equipment = new BehaviorSubject<IEquipment[]>([]);

  public readonly filterForm = new FormGroup({
    employeeId: new FormControl(),
    equipmentTypeId: new FormControl(),
    manufacturerId: new FormControl()
  });

  public readonly filteredEquipment: Observable<IEquipment[]> = combineLatest(
    this.equipment,
    concat(
      of(this.filterForm.value),
      this.filterForm.valueChanges
    )
  ).pipe(map(this.filterEquipment));

  public readonly equipmentTypes = this.equipment.pipe(map(x => this.distinctValues(x, a => a.equipmentType)));
  public readonly employees = this.equipment.pipe(map(x => this.distinctValues(x, a => a.employee)));
  public readonly manufacturers = this.equipment.pipe(map(x => this.distinctValues(x, a => a.manufactor)));

  constructor(
    private equipmentService: EquipmentService,
    private router: Router) {
  }

  ngOnInit() {
    this.equipmentService.getEquipment().subscribe(this.equipment);
  }

  public editEquipment(equipment: IEquipment) {
    this.router.navigate(['/equipment', equipment.id]);
  }

  private filterEquipment(input: [IEquipment[], IFilter]) {
    const [ equipment, filter ] = input;

    return equipment.filter(e => {
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

  private distinctValues(list: IEquipment[], accessor: (item: IEquipment) => ISimpleValue) {
    const values = list.map(accessor);
    return this.distinct(values, x => x.id);
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
