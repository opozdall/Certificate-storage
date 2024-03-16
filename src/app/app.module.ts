import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CertListComponent } from './components/cert-list/cert-list.component';
import { CertStorageComponent } from './components/cert-storage/cert-storage.component';

@NgModule({
  declarations: [
    AppComponent,
    CertStorageComponent,
    CertListComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
