import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../types';

@Injectable()
export default class EquipmentService {
  private static readonly BASEURL = 'http://localhost:3001';

  constructor(private http: HttpClient) {

  }

  getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${EquipmentService.BASEURL}/equipments`);
  }
}
