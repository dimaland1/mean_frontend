import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HttpClientModule,RouterLink, RouterOutlet, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isLoggedIn : boolean;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.isLoggedIn = false
  }

  // ajouter true a isLogged si l'utilisateur est connecté

  ngOnInit() {
    if(localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.cdr.detectChanges();
    }
  }

  deconnexion() {
    // vider le localstorage
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    this.cdr.detectChanges();
  }

  home(){
    this.router.navigate(['/home']);
  }
  
}
