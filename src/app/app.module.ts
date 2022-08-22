import { StoreService } from './store.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarListComponent } from './components/car-list/car-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
