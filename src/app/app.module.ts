import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapViewComponent } from './map-view/map-view.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { BookModalComponent } from './book-modal/book-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapViewComponent,
    HotelCardComponent,
    HotelListComponent,
    BookModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
