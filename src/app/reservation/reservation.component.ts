import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LocationService } from '../location.service';
import { BiensService } from '../biens.service';
import { NgFor } from '@angular/common';
import { FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

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
  imageUrl: string
}

interface reservation {
  idLocation: number;
  idBien: number;
  mailLoueur: string;
  dateDebut: string;
  dateFin: string;
  avis : string;
  note: Number;
  commune : string;
  rue: number;
  cp: number;
  nbCouchages: Number,
  nbChambres: Number,
  distance: Number,
  prix: Number,
  imageUrl: string,
}

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [NavbarComponent, NgFor, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
  providers: [LocationService, BiensService]
})
export class ReservationComponent {

  reservations : reservation[] = [];
  Biens : Bien[] = [];
  noteForm: FormGroup;


  constructor(private locationService: LocationService,
    private bienService: BiensService
  ) {
    this.noteForm = new FormGroup({
      note: new FormControl('0')
    });
  }

  submitNote(id : Number) {
    let note = this.noteForm.value.note;
    console.log('Note soumise :', note);
    console.log('id soumis :', id)
    
    if(Number(note) >= 1 && Number(note) <= 10) {
      this.locationService.addAvis(Number(id), Number(note)).subscribe((data: any) => {
        console.log(data);
        alert("Note ajoutée avec succès");
        // refresh
        this.ngOnInit();

      });
    }else {
      alert("la note doit être comprise entre 0 et 10")
    }

    return false;
  }

  ngOnInit() {
    this.locationService.getLocations(localStorage.getItem("email")).subscribe((data: any) => {

      this.reservations = data;
      console.log(this.reservations);

      for(let i = 0; i < this.reservations.length; i++) {
        this.bienService.getBienById(String(this.reservations[i].idBien)).subscribe((data: any) => {
          this.Biens.push(data[0]);
          this.reservations[i].commune = data[0].commune;
          this.reservations[i].rue = data[0].rue;
          this.reservations[i].cp = data[0].cp;
          this.reservations[i].nbCouchages = data[0].nbCouchages;
          this.reservations[i].nbChambres = data[0].nbChambres;
          this.reservations[i].distance = data[0].distance;
          this.reservations[i].prix = data[0].prix;
          this.reservations[i].imageUrl = data[0].imageUrl;
          
        });
      }
    });
  }

}
