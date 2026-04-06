import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EntryCommonModule } from '@enigmatry/entry-components/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        BrowserModule,
        EntryCommonModule.forRoot(),
        AppRoutingModule
    ],
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- will have to be dealt with in Angular 22 (https://enigmatry.atlassian.net/browse/BP-1582)
    providers: [provideHttpClient(), provideAnimations()],
    bootstrap: [AppComponent]
})
export class AppModule { }
