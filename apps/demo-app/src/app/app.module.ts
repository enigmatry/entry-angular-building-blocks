import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EntryCommonModule } from '@enigmatry/entry-components/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        EntryCommonModule.forRoot(),
        AppRoutingModule
    ],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule { }
