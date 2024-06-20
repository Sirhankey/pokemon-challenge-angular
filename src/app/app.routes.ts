import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { BoosterShopComponent } from '../pages/booster-shop/booster-shop.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: BoosterShopComponent }

  // {path: 'decks', component: DecksComponent},
];
