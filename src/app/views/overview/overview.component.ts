import { Component, OnInit } from '@angular/core';
import EquipmentService from 'src/app/services/EquipmentService';
import { Equipment } from 'src/app/types';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export default class OverviewComponent implements OnInit {
  public equipment: Equipment[] = [];

  constructor(private equipmentService: EquipmentService) {

  }

  ngOnInit() {
    this.equipmentService.getEquipment().subscribe((equipment) => {
      this.equipment = equipment;
    });
  }
}
