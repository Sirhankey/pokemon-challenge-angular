import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { PokemonService } from '../../services/pokemon.service';
import { getRandomElements } from '../../utils/utility';
import { CardModalComponent } from '../../components/card-modal/card-modal.component';
import { BehaviorSubject, catchError, forkJoin, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app/app.component';

@Component({
  selector: 'app-booster-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModalComponent],
  templateUrl: './booster-shop.component.html',
  styleUrl: './booster-shop.component.scss'
})
export class BoosterShopComponent implements OnInit {
  private cardsSubject = new BehaviorSubject<Card[]>([]);
  cards$ = this.cardsSubject.asObservable();
  types: string[] = [];
  selectedType: string | null = null;
  selectedImage: string | null = null;
  isModalVisible: boolean = false;

  constructor(
    private pokemonService: PokemonService, private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.loadCardTypes();
  }

  loadCardTypes() {
    this.appComponent.showLoading();
    this.pokemonService.getCardsTypes().pipe(
      tap(response => {
        this.types = response.data;
        this.appComponent.hideLoading();
      }),
      catchError(error => {
        this.appComponent.hideLoading();
        console.error(error);
        return of([]);
      })
    ).subscribe();
  }

  openBooster() {
    if (!this.selectedType) return;
    this.cardsSubject.next([]);
    this.appComponent.showLoading();

    const pokemonLimit = 'nationalPokedexNumbers:[1 TO 250]';

    const energyCards$ = this.pokemonService.searchCards('supertype:Energy subtypes:Basic');
    const trainerCards$ = this.pokemonService.searchCards('supertype:Trainer');
    const baseCards$ = this.pokemonService.searchCards('set.series:base types:' + this.selectedType + ' ' + pokemonLimit);
    const rareCards$ = this.pokemonService.searchCards('rarity:Rare types:' + this.selectedType + ' ' + pokemonLimit);

    forkJoin([baseCards$, rareCards$, trainerCards$, energyCards$]).pipe(
      tap({
        next: ([baseResponse, rareResponse, trainerResponse, energyResponse]) => {
          const baseCards = getRandomElements(baseResponse.data, 9);
          const energyCards = getRandomElements(energyResponse.data, 5);
          const trainerCards = getRandomElements(trainerResponse.data, 5);
          const rareCards = getRandomElements(rareResponse.data, 1);

          this.cardsSubject.next([...baseCards, ...energyCards, ...trainerCards, ...rareCards]);
          this.appComponent.hideLoading();
        },
        error: () => {
          this.appComponent.hideLoading();
        }
      })
    ).subscribe();
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
