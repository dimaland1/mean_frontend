import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { BiensService } from '../biens.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

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
  moyenne: Number
}


@Component({
  selector: 'app-bien',
  standalone: true,
  imports: [HttpClientModule, NgFor, NavbarComponent,
    RouterLink, RouterOutlet, RouterModule
  ],
  templateUrl: './bien.component.html',
  styleUrl: './bien.component.css',
  providers: [BiensService]
})
export class BienComponent {
  mailProprio: any;

  biens : Bien[] = [];

  constructor(private router: Router, 
    private bienService: BiensService) {
    
      this.mailProprio = localStorage.getItem('email');
  }

  ngOnInit() {

   this.mailProprio = localStorage.getItem('email');
   console.log(this.mailProprio);
    // faire une recherche sur la route /biens
    this.bienService.getBienByEmail().subscribe((data: any) => {
      console.log(data);

      this.biens = data;
    });
  }

  supprimerBien(id: any) {
    this.bienService.deleteBien(id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

}
