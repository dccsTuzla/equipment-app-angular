import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import HeaderComponent from './header';
import routes from './routes';
import EquipmentService from './services/EquipmentService';
import OverviewComponent from './views/overview';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    EquipmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
