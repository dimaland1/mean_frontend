import { Component } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [UtilisateurService]
})
export class RegisterComponent {

  registerForm : FormGroup;

  constructor(private utilisateurService : UtilisateurService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      numero: new FormControl(''),
      mdp: new FormControl(''),
    });
  }

  onRegister() {
    console.log("lancement de la création d'un utilisateur");

    // récupération des données du formulaire
    const email = this.registerForm.value.email;
    const nom = this.registerForm.value.nom;
    const prenom = this.registerForm.value.prenom;
    const numero = this.registerForm.value.numero;
    const mdp = this.registerForm.value.mdp;

    // appel à la méthode creerUtilisateur du service utilisateur
    this.utilisateurService.creerUtilisateur(email, nom, prenom, numero, mdp).subscribe(
      (data) => {
        console.log(data);
        // redirection vers la page de connexion
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
