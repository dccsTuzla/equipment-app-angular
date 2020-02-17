import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEquipment, IEmployee, IEquipmentType, IManufacturer, IEquipmentBase } from '../types';

@Injectable()
export default class EquipmentService {
  private static readonly BASEURL = 'http://localhost:3001';

  constructor(private http: HttpClient) {

  }

  getEquipmentById(id: string): Observable<IEquipment> {
    const url = `${EquipmentService.BASEURL}/equipments/${id}?_expand=employee&_expand=equipmentType&_expand=manufactor`;
    return this.http.get<IEquipment>(url);
  }

  getEquipment(): Observable<IEquipment[]> {
    return this.http.get<IEquipment[]>(`${EquipmentService.BASEURL}/equipments/?_expand=employee&_expand=equipmentType&_expand=manufactor`);
  }

  saveEquipment(equipment: IEquipmentBase): Observable<IEquipmentBase> {
    if (!equipment.id) {
      return this.http.post<IEquipmentBase>(`${EquipmentService.BASEURL}/equipments`, equipment);
    } else {
      return this.http.put<IEquipmentBase>(`${EquipmentService.BASEURL}/equipments/${equipment.id}`, equipment);
    }
  }

  deleteEquipment(equipmentId: string): Observable<{}> {
    return this.http.delete<{}>(`${EquipmentService.BASEURL}/equipments/${equipmentId}`);
  }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${EquipmentService.BASEURL}/employees`);
  }

  getEquipmentTypes(): Observable<IEquipmentType[]> {
    return this.http.get<IEquipmentType[]>(`${EquipmentService.BASEURL}/equipmentTypes`);
  }

  getManufacturers(): Observable<IManufacturer[]> {
    return this.http.get<IManufacturer[]>(`${EquipmentService.BASEURL}/manufactors`);
  }
}
