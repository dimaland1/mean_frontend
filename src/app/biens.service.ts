import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BiensService {
  URL_API = 'http://localhost:3033/api';
  // faire une recherche sur la route /biens
  constructor(private http: HttpClient) { }

  getBiens(
    dateDebut: string, 
    dateFin: string, 
    location: string, 
    maxPrice: string, 
    minRooms: string, 
    minBeds: string, 
    maxDistance: string) {
    // passer les données en params
    return this.http.get(this.URL_API + '/biens' + '?dateDebut=' + dateDebut + '&dateFin=' + dateFin + '&localisation=' + location + '&maxPrix='+ maxPrice + '&minRooms=' + minRooms + '&minBeds=' + minBeds + '&maxDistance=' + maxDistance);
  }

  // passer id en params
  getBienById(id: string) {
    return this.http.get(this.URL_API + '/biens/' + id);
  }


  createBien(mailProprio : any, commune: string, rue: string, cp: string, nbCouchages: string, nbChambres: string, distance: string, prix: string, imageUrl: string) {
    let idBien = 0;
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(this.URL_API + '/creerBiens' ,  
    // il faut faire passer en body les données
    {
      idBien,
      mailProprio,
      commune,
      rue,
      cp,
      nbCouchages,
      nbChambres,
      prix,
      distance,
      imageUrl
    },
    { headers }
    ); 
  }
  modifierBien(id : any, mailProprio : any, commune: string, rue: string, cp: string, nbCouchages: string, nbChambres: string, distance: string, prix: string, imageUrl: string) {
    let idBien = id;
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(this.URL_API + '/modifierBiens' ,  
    // il faut faire passer en body les données
    {
      idBien,
      mailProprio,
      commune,
      rue,
      cp,
      nbCouchages,
      nbChambres,
      prix,
      distance,
      imageUrl
    },
    { headers }
    ); 
  }


  getBienByEmail() {
    let mailProprio = localStorage.getItem('email');
    return this.http.get(this.URL_API + '/biensProprio/' + mailProprio);
  }

  deleteBien(id: any) {
    return this.http.delete(this.URL_API + '/supprimerBiens/' + id);
  }
}
