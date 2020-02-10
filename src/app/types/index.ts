export interface Equipment {
  id: string;
  employeeId: number;
  equipmentTypeId: number;
  manufactorId: number;
  serialNumber: string;
  model: string;
  invoiceDate: Date;
  guarantee: Date;
}
