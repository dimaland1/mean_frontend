import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilisateurService } from '../utilisateur.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';


interface Login {
  _id: number;
  nom: string;
  prenom: string;
  token: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UtilisateurService]
})
export class LoginComponent {

  loginForm : FormGroup;
  data : Login;



  constructor(private utilisateurService : UtilisateurService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      mdp: new FormControl(''),
    });

    this.data = {
      _id: 0,
      nom: '',
      prenom: '',
      token: ''
    }
  }

  onLogin() {
    console.log("lancement de la connexion");

    // récupération des données du formulaire
    const email = this.loginForm.value.email;
    const mdp = this.loginForm.value.mdp;

    // appel à la méthode login du service utilisateur
    this.utilisateurService.login(email, mdp).subscribe(
      (data : any) => {
        console.log(data);

        this.data = data as Login;

        localStorage.setItem('token', this.data.token);

        localStorage.setItem('nom', this.data.nom);
        localStorage.setItem('prenom', this.data.prenom);

        localStorage.setItem('email', email);
        
        // redirection vers la page d'accueil
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
