import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BiensService } from '../biens.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { LocationService } from '../location.service';
import { HttpHeaders } from '@angular/common/http';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';



interface Bien {
  idBien: number;
  mailProprio: string;
  commune: string;
  rue: number;
  cp: number;
  nbCouchages: Number,
  nbChambres: Number,
  distance: Number,
  prix: Number,
  imageUrl: string,
  prixTotal: Number,
  nbJour: Number,
  moyenne: Number
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, NgFor, NavbarComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [BiensService, LocationService]
})
export class HomeComponent {
  title = 'Home';
  isLogged : boolean;

  EndDate: Date;
  startDate: Date;

  setStartDate(event: any) {
    this.startDate = new Date(event.value);
    this.EndDate = new Date(this.startDate.getTime());
    this.EndDate.setDate(this.EndDate.getDate() + 1); 
    }


  searchForm : FormGroup;

  biens : Bien[] = [];
  

  constructor(private bienService: BiensService, private locationService: LocationService,private http: HttpClient) {
    this.searchForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      location: new FormControl(''),
      maxPrice: new FormControl(''),
      minRooms: new FormControl(''),
      minBeds: new FormControl(''),
      maxDistance: new FormControl('')
    });

    this.EndDate = new Date();
    this.startDate = new Date();
    this.isLogged = false;

  }

  ngOnInit() {
    this.isLogged = false;
    if(localStorage.getItem('token')) {
      this.isLogged = true;
      console.log("isLogged", this.isLogged);
    }
  }

  onSubmit() {
  
    console.log("lancement de la recherche");

    // appeler le service api avec les valeurs du formulaire qui se trouve dans le service api.service.ts

    let dateDebut = this.searchForm.get('startDate')?.value;
    let dateFin = this.searchForm.get('endDate')?.value ;
    let location = this.searchForm.get('location')?.value;
    let maxPrice = this.searchForm.get('maxPrice')?.value || -1;
    let minRooms = this.searchForm.get('minRooms')?.value || -1;
    let minBeds = this.searchForm.get('minBeds')?.value || -1;
    let maxDistance = this.searchForm.get('maxDistance')?.value || -1;

    console.log(maxPrice);
    console.log("dateDebut", dateDebut);

    if(dateDebut == "" ) {
      alert("Veuillez renseigner les dates de début !");
      return;
    }

    if( dateFin == "") {
      alert("Veuillez renseigner les dates de fin !");
      return;
    }

    if(location == "") {
      alert("Veuillez renseigner la destination !");
      return;
    }

    if(dateDebut > dateFin) {
      alert("La date de fin doit être après la date de début");
      return;
    }

    this.bienService.getBiens(dateDebut, dateFin, location,String(maxPrice), minRooms, minBeds,maxDistance).subscribe((data) => {
      console.log(data);

      // ajouter pour chaque bien une card dans le html
      this.biens = data as Bien[];

      let dateDebut = new Date(this.searchForm.get('startDate')?.value);
      let dateFin = new Date(this.searchForm.get('endDate')?.value);

      const differenceInTime = dateFin.getTime() - dateDebut.getTime();

      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      const jours = Math.round(differenceInDays);
    
      console.log("le nombres de jours est de : " + jours);

      for(let i = 0; i < this.biens.length; i++) {
        this.biens[i].prixTotal = Number(this.biens[i].prix) * jours;
        this.biens[i].nbJour = jours;
      }

    });
      
  }

  creationLocation(id: Number){
    console.log(id)
    let Bien = this.biens.find(bien => bien.idBien == id);

    //effectuer la location

    let dateDebut = this.searchForm.get('startDate')?.value;
    let dateFin = this.searchForm.get('endDate')?.value;
    let mailLocataire = localStorage.getItem('email');

    this.locationService.creerLocation(id.toString(), mailLocataire, dateDebut, dateFin).subscribe((data) => {
      alert("Location effectuée avec succès");
    });


  }


}
