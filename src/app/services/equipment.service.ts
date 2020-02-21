import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, of, combineLatest } from 'rxjs';
import { IEquipment, IEmployee, IEquipmentType, IManufacturer, IEquipmentBase } from '../types';
import { EquipmentStore } from '../store/equipment.store';
import { tap, map, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export default class EquipmentService {
  private static readonly BASEURL = 'http://localhost:3001';

  private employees: IEmployee[] | undefined;
  private equipmentTypes: IEquipmentType[] | undefined;
  private manufacturers: IManufacturer[] | undefined;

  constructor(private http: HttpClient, private equipmentStore: EquipmentStore) {

  }

  loadEquipment(): Observable<IEquipment[]> {
    return combineLatest(
      this.http.get<IEquipment[]>(`${EquipmentService.BASEURL}/equipments`),
      this.getEmployees(),
      this.getManufacturers(),
      this.getEquipmentTypes()
    ).pipe(
      map(([equipment, employees, manufacturers, equipmentTypes]) => {
        return equipment.map((e): IEquipment => ({
            ...e,
            employee: employees.filter(x => Number(x.id) === Number(e.employeeId))[0],
            manufactor: manufacturers.filter(x => Number(x.id) === Number(e.manufactorId))[0],
            equipmentType: equipmentTypes.filter(x => Number(x.id) === Number(e.equipmentTypeId))[0]
          }));
        }),
      tap((data) => this.equipmentStore.set(data))
    );
  }

  saveEquipment(equipment: IEquipmentBase): Observable<IEquipment> {
    return combineLatest(
      this.getSaveObservable(equipment),
      this.getEmployees(),
      this.getManufacturers(),
      this.getEquipmentTypes()
    ).pipe(
      map(([e, employees, manufacturers, equipmentTypes]): IEquipment => ({
        ...e,
        employee: employees.filter(x => Number(x.id) === Number(e.employeeId))[0],
        manufactor: manufacturers.filter(x => Number(x.id) === Number(e.manufactorId))[0],
        equipmentType: equipmentTypes.filter(x => Number(x.id) === Number(e.equipmentTypeId))[0]
        })),
      tap((data) => this.equipmentStore.upsert(data.id, data))
    );
  }

  deleteEquipment(equipmentId: string): Observable<{}> {
    return this.http.delete<{}>(`${EquipmentService.BASEURL}/equipments/${equipmentId}`)
      .pipe(tap(() => this.equipmentStore.remove(equipmentId)));
  }

  getEmployees(): Observable<IEmployee[]> {
    if (this.employees) {
      return of(this.employees);
    } else {
      return this.http.get<IEmployee[]>(`${EquipmentService.BASEURL}/employees`)
        .pipe(tap((data) => this.employees = data));
    }
  }

  getEquipmentTypes(): Observable<IEquipmentType[]> {
    if (this.equipmentTypes) {
      return of(this.equipmentTypes);
    } else {
      return this.http.get<IEquipmentType[]>(`${EquipmentService.BASEURL}/equipmentTypes`)
        .pipe(tap((data) => this.equipmentTypes = data));
    }
  }

  getManufacturers(): Observable<IManufacturer[]> {
    if (this.manufacturers) {
      return of(this.manufacturers);
    } else {
      return this.http.get<IManufacturer[]>(`${EquipmentService.BASEURL}/manufactors`)
        .pipe(tap((data) => this.manufacturers = data));
    }
  }

  private getSaveObservable(equipment: IEquipmentBase) {
    if (!equipment.id) {
      return this.http.post<IEquipmentBase>(`${EquipmentService.BASEURL}/equipments`, equipment);
    } else {
      return this.http.put<IEquipmentBase>(`${EquipmentService.BASEURL}/equipments/${equipment.id}`, equipment);
    }
  }
}
