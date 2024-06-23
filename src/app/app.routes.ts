import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { BoosterShopComponent } from '../pages/booster-shop/booster-shop.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { DeckManagerComponent } from '../pages/deck-manager/deck-manager.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: BoosterShopComponent, canActivate: [AuthGuard] },
  { path: 'decks', component: DeckManagerComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }

  // {path: 'decks', component: DecksComponent},
];
