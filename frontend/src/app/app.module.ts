import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataMaterialModule} from './matrial-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {GatewayPopupComponent} from './home/gateway-popup/gateway-popup.component';
import {GatewayService} from './service/gateway.service';
import {DevicePopupComponent} from './home/device-popup/device-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GatewayPopupComponent,
    DevicePopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DataMaterialModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}, GatewayService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
