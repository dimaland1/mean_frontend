import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BiensService } from '../biens.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';


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

@Component({
  selector: 'app-creation',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, NgFor, NavbarComponent],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css',
  providers: [BiensService]
})

export class CreationComponent {

  title = 'Creation';

  creationForm : FormGroup;

  biens : Bien[] = [];
  
  constructor(private bienService: BiensService) {
    this.creationForm = new FormGroup({
      commune: new FormControl(''),
      rue: new FormControl(''),
      cp: new FormControl(''),
      nbCouchages: new FormControl(''),
      nbChambres: new FormControl(''),
      distance: new FormControl(''),
      prix: new FormControl(''),
      imageUrl: new FormControl('')
    });
  }

  onSubmit() {
    console.log("lancement de la creation");

    // appeler le service api avec les valeurs du formulaire qui se trouve dans le service api.service.ts

    let commune = this.creationForm.get('commune')?.value;
    let rue = this.creationForm.get('rue')?.value;
    let cp = this.creationForm.get('cp')?.value;
    let nbCouchages = this.creationForm.get('nbCouchages')?.value;
    let nbChambres = this.creationForm.get('nbChambres')?.value;
    let distance = this.creationForm.get('distance')?.value;
    let prix = this.creationForm.get('prix')?.value;
    let imageUrl = this.creationForm.get('imageUrl')?.value;
    let mailProprio = localStorage.getItem('email') ;



    this.bienService.createBien(mailProprio, commune, rue, cp, nbCouchages, nbChambres, distance, prix, imageUrl).subscribe((data: any) => {
      console.log(data);
      alert("Bien créé avec succès");
    });


  }


}
