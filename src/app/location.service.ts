import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  URL_API = 'http://localhost:3033/api';
  // faire une recherche sur la route /biens
  constructor(private http: HttpClient) { }


  creerLocation(idBien: string, mailLoueur: any, dateDebut: any, dateFin: any) {
    let idLocation = 1;
    return this.http.post(`${this.URL_API}/creerLocations`,
      {
        idLocation,
        idBien,
        mailLoueur,
        dateDebut,
        dateFin
      }
    );
  }


  getLocations(mailLoueur: any) {
    return this.http.get(`${this.URL_API}/locations/${mailLoueur}`);
  }

  addAvis(idLoc: Number, val: Number) {

    /*
    {
    "idLocation" : 1,
    "note" : 8
}
    
    */
    return this.http.post(`${this.URL_API}/avislocation`, {
      idLoc,
      val
    });
  }

}
