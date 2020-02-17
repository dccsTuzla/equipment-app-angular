import { Routes } from '@angular/router';
import EquipmentResolver from './views/manage/manage-equipment.resolver';
import ManageComponent from './views/manage/manage.component';
import StartPageComponent from './views/start-page/start-page.component';
import OverviewComponent from './views/overview/overview.component';

const routes: Routes = [
  { path: '', component: StartPageComponent, pathMatch: 'full' },
  { path: 'equipment', component: OverviewComponent, pathMatch: 'full' },
  { path: 'equipment/:id', component: ManageComponent, pathMatch: 'full', resolve: { equipment: EquipmentResolver } }
];

export default routes;
