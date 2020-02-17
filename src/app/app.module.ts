import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import HeaderComponent from './components/header/header.component';
import routes from './routes';
import EquipmentService from './services/equipment.service';
import OverviewComponent from './views/overview/overview.component';
import EquipmentResolver from './views/manage/manage-equipment.resolver';
import ManageComponent from './views/manage/manage.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

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
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),

    // primeng
    ToolbarModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule
  ],
  providers: [
    EquipmentService,
    EquipmentResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
