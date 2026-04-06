import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
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
        EntryCommonModule.forRoot(),
        AppRoutingModule
    ],
    providers: [provideHttpClient(), provideAnimations()],
    bootstrap: [AppComponent]
})
export class AppModule { }
