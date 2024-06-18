import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CadastrosModule } from './modules/cadastros/cadastros.module';
import { OrdensModule } from './modules/ordens/ordens.module';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask} from 'ngx-mask';
import {BaseComponent} from "./modules/shared/base/base.component";


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      closeButton: true,
      progressBar: true,
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ReactiveFormsModule,
    HttpClientModule,
    CadastrosModule,
    OrdensModule,
    CurrencyMaskModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ToastrService,
    provideEnvironmentNgxMask(maskConfig),
  ],
  exports: [
    BaseComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
