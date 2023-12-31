import {LOCALE_ID, NgModule} from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapArrowDownSquareFill, bootstrapArrowLeftSquareFill,
  bootstrapArrowRightSquareFill, bootstrapArrowUpSquareFill,
} from '@ng-icons/bootstrap-icons';
import { BrowserModule } from '@angular/platform-browser';
import {AsyncPipe, registerLocaleData} from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header/header.component';
import { InputConverterComponent } from './components/input-converter/input-converter.component';

registerLocaleData(localeUk);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputConverterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({ bootstrapArrowRightSquareFill, bootstrapArrowDownSquareFill, bootstrapArrowUpSquareFill, bootstrapArrowLeftSquareFill}),
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'uk' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
