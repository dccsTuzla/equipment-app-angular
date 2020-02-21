import { EntityState, EntityStore, StoreConfig, QueryEntity } from '@datorama/akita';
import { IEquipment } from '../types';
import { Injectable } from '@angular/core';

export interface EquipmentState extends EntityState<IEquipment, string> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'equipment' })
export class EquipmentStore extends EntityStore<EquipmentState> {
  constructor() {
    super();
  }
}

@Injectable({ providedIn: 'root' })
export class EquipmentQuery extends QueryEntity<EquipmentState> {
  constructor(protected store: EquipmentStore) {
    super(store);
  }
}
