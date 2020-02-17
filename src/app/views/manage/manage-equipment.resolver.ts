import { IEquipment } from 'src/app/types';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import EquipmentService from 'src/app/services/equipment.service';
import { Injectable } from '@angular/core';

@Injectable()
export default class EquipmentResolver implements Resolve<IEquipment> {

  constructor(private equipmentService: EquipmentService, private router: Router) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEquipment> {
    const id = route.params.id;

    if (id === 'new') {
      return of(undefined);
    } else {
      return this.equipmentService.getEquipmentById(id).pipe(catchError(this.handleError));
    }
  }

  private readonly handleError = (err: Error) => {
    this.router.navigate(['/equipment/new']);
    return throwError(err);
  }
}
