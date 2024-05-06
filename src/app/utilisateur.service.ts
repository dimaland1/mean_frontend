import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  URL_API = 'http://localhost:3033/api';
  // faire une recherche sur la route /biens
  constructor(private http: HttpClient) { }

  login(mail: string, motDePasse: string) {
    return this.http.post(this.URL_API + '/login', { mail, motDePasse });
  }

  creerUtilisateur(mail: string,nom : string, prenom: string, numero : string, motDePasse: string) {
    return this.http.post(this.URL_API + '/creerUtilisateur', { mail, nom, prenom, numero, motDePasse });
  }
}
