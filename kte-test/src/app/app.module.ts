import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsListComponent } from './Components/items-list/items-list.component';

import { ItemsService } from './Services/items.service';
import { Constants } from './Config/constants';
import { LoadingService } from './Services/loading.service';
import { InterceptorProviders } from './Services/interceptor';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightDirective } from './Directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [ItemsService, Constants, LoadingService, InterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
