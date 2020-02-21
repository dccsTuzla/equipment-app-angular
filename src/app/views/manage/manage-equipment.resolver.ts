import { IEquipment } from 'src/app/types';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import EquipmentService from 'src/app/services/equipment.service';
import { Injectable } from '@angular/core';
import { EquipmentQuery } from 'src/app/store/equipment.store';

@Injectable()
export default class EquipmentResolver implements Resolve<IEquipment> {

  constructor(
    private equipmentQuery: EquipmentQuery,
    private equipmentService: EquipmentService,
    private router: Router) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEquipment> {
    const id = route.params.id;

    if (id === 'new') {
      return of(undefined);
    } else if (!this.equipmentQuery.hasEntity()) {
      return this.equipmentService.loadEquipment()
        .pipe(map(() => null))
        .pipe(() => of(this.equipmentQuery.getEntity(id)))
        .pipe(catchError(this.handleError));
    } else {
      return of(this.equipmentQuery.getEntity(id));
    }
  }

  private readonly handleError = (err: Error) => {
    this.router.navigate(['/equipment/new']);
    return throwError(err);
  }
}
