import { Routes } from '@angular/router';
import StartPageComponent from './start-page';

const routes: Routes = [
  { path: '', component: StartPageComponent, pathMatch: 'full' },
  { path: 'equipment/new', component: StartPageComponent, pathMatch: 'full' },
  { path: 'equipment', component: StartPageComponent, pathMatch: 'full' }
];

export default routes;
