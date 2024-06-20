import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { PokemonService } from '../../services/pokemon.service';
import { getRandomElements } from '../../utils/utility';
import { CardModalComponent } from '../../components/card-modal/card-modal.component';

@Component({
  selector: 'app-booster-shop',
  standalone: true,
  imports: [CommonModule, CardModalComponent],
  templateUrl: './booster-shop.component.html',
  styleUrl: './booster-shop.component.scss'
})
export class BoosterShopComponent implements OnInit {
  cards: Card[] = [];
  selectedImage: string | null = null;
  isModalVisible: boolean = false;

  constructor(
    private pokemonService: PokemonService
  ) { }

  openBooster() {
    this.cards = [];

    this.pokemonService.searchCards('set.series:base').subscribe(baseResponse => {
      const baseCards = getRandomElements(baseResponse.data, 9);

      this.cards = [...this.cards, ...baseCards];

      this.pokemonService.searchCards('rarity:Rare').subscribe(legendResponse => {
        const legendCards = getRandomElements(legendResponse.data, 1);

        this.cards = [...this.cards, ...legendCards];
      });
    });
  }



  ngOnInit(): void {
  }

  showImage(imageSrc: string) {
    this.selectedImage = imageSrc;
    this.isModalVisible = true;
  }

  handleCloseModal() {
    this.isModalVisible = false;
    this.selectedImage = null;
  }

}
