import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import HeaderComponent from './components/header/header.component';
import routes from './routes';
import EquipmentService from './services/equipment.service';
import OverviewComponent from './views/overview/overview.component';
import EquipmentResolver from './views/manage/manage-equipment.resolver';
import ManageComponent from './views/manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    EquipmentService,
    EquipmentResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
