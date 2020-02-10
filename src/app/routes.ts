import { Routes } from '@angular/router';
import StartPageComponent from './views/start-page';
import OverviewComponent from './views/overview';

const routes: Routes = [
  { path: '', component: StartPageComponent, pathMatch: 'full' },
  { path: 'equipment/new', component: StartPageComponent, pathMatch: 'full' },
  { path: 'equipment', component: OverviewComponent, pathMatch: 'full' }
];

export default routes;
