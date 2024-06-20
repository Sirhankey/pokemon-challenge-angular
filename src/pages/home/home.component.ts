import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Card } from '../../models/card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  goToBoosterShop(): void {
    this.router.navigate(['/shop']);
  }


}
