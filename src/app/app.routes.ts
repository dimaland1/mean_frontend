import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BienComponent } from './bien/bien.component';
import { RegisterComponent } from './register/register.component';
import { CreationComponent } from './creation/creation.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ModifierComponent } from './modifier/modifier.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'bien', component: BienComponent },
    { path: 'creer', component: CreationComponent},
    {path: 'reservation', component: ReservationComponent},
    { path: 'modifier/:id', component : ModifierComponent}
];
