import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BiensService } from '../biens.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [NavbarComponent,RouterLink, ReactiveFormsModule, HttpClientModule, NgFor, NavbarComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
  providers: [BiensService]
})
export class ModifierComponent {

  id :string;
  commune : string;
  rue: string;
  cp: string;
  nbCouchages: string;
  nbChambres: string;
  distance: string;
  prix: string;
  imageUrl: string;

  modifierForm : FormGroup;

  constructor(private bienService: BiensService,
    private route : ActivatedRoute
  ) {
    this.id = '';
    this.commune = '';
    this.rue = '';
    this.cp = ''; 
    this.nbCouchages = '';
    this.nbChambres = '';
    this.distance = '';
    this.prix = '';
    this.imageUrl = '';

    this.modifierForm = new FormGroup({
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

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.bienService.getBienById(this.id).subscribe((data: any) => {
      console.log(data);

      this.commune = data[0].commune;
      this.rue = data[0].rue;
      this.cp = data[0].cp;
      this.nbCouchages = data[0].nbCouchages;
      this.nbChambres = data[0].nbChambres;
      this.distance = data[0].distance;
      this.prix = data[0].prix;
      this.imageUrl = data[0].imageUrl;

      this.modifierForm = new FormGroup({
        commune: new FormControl(this.commune),
        rue: new FormControl(this.rue),
        cp: new FormControl(this.cp),
        nbCouchages: new FormControl(this.nbCouchages),
        nbChambres: new FormControl(this.nbChambres),
        distance: new FormControl(this.distance),
        prix: new FormControl(this.prix),
        imageUrl: new FormControl(this.imageUrl)
      });

    });
  }

  onSubmit() {
    console.log("lancement de la creation");

    // appeler le service api avec les valeurs du formulaire qui se trouve dans le service api.service.ts

    let commune = this.modifierForm.get('commune')?.value;
    let rue = this.modifierForm.get('rue')?.value;
    let cp = this.modifierForm.get('cp')?.value;
    let nbCouchages = this.modifierForm.get('nbCouchages')?.value;
    let nbChambres = this.modifierForm.get('nbChambres')?.value;
    let distance = this.modifierForm.get('distance')?.value;
    let prix = this.modifierForm.get('prix')?.value;
    let imageUrl = this.modifierForm.get('imageUrl')?.value;
    let mailProprio = localStorage.getItem('email') ;


    this.bienService.modifierBien(this.id, mailProprio, commune, rue, cp, nbCouchages, nbChambres, distance, prix, imageUrl).subscribe((data: any) => {
      console.log(data);
      alert('Bien modifié avec succès');
    });


  }
}
