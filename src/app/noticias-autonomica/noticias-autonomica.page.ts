import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonThumbnail, IonContent, IonHeader, IonText, IonGrid, IonCard, IonItem, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { NewsApiService } from '../services/newsapi.service';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-noticias-autonomica',
  templateUrl: './noticias-autonomica.page.html',
  styleUrls: ['./noticias-autonomica.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonThumbnail, IonLabel, IonItem, IonCard, IonGrid, IonText, IonContent, IonHeader, CommonModule, FormsModule, HeaderComponent, RouterLink]
})
export class NoticiasAutonomicaPage implements OnInit {

  noticias: any;
  lugar: string;
  errorMessage: string;

  constructor(private newsapi: NewsApiService, private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() {
    this.firebase.comprobarUsuario().then( uidUsuario => {
      if(uidUsuario) {
        this.firestore.getUsuario(uidUsuario).then ( usuario => {
          if(usuario) {
            this.lugar = usuario.ccaa;
            this.newsapi.getNewsByPlaceConApi(usuario.ccaa, usuario.apinoticias).subscribe({
              next: (response) => {
                this.noticias = response;
              },
              error: (error) => {
                this.errorMessage = error;
              }
            })
          }
        })
      }
    })
  }

}
