export interface IEquipmentBase {
  id: string;
  employeeId: number | string;
  equipmentTypeId: number | string;
  manufactorId: number | string;
  serialNumber: string;
  model: string;
  invoiceDate: string;
  guarantee: string;
}

export interface ISimpleValue {
  id: number;
  value: string;
}

export type IEmployee = ISimpleValue;
export type IEquipmentType = ISimpleValue;
export type IManufacturer = ISimpleValue;

export interface IEquipment extends IEquipmentBase {
  employee: IEmployee;
  equipmentType: IEquipmentType;
  manufactor: IManufacturer;
}
