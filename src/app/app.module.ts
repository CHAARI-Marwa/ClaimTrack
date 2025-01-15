import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/services/user.service';
import { LoginComponent } from './login/login.component';
import { ArticleVenduComponent } from './article-vendu/article-vendu.component';
import { PieceRechangeDetailsComponent } from './piece-rechange-details/piece-rechange-details.component';
import { FormPieceRechangeDetailsComponent } from './form-piece-rechange-details/form-piece-rechange-details.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ArticleVenduComponent,
    PieceRechangeDetailsComponent,
    FormPieceRechangeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Durée de la notification
      positionClass: 'toast-top-right', // Position de la notification
      preventDuplicates: true, // Éviter les doublons
    })
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
