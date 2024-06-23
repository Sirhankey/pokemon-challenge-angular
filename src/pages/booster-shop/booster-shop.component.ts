import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { getRandomElements } from '../../utils/utility';
import { CardModalComponent } from '../../components/card-modal/card-modal.component';
import { BehaviorSubject, catchError, forkJoin, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app/app.component';
import pokemonTypes from '../../utils/pokemon-types';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { boosterMocks } from '../../utils/booster-mocks';
import { TooltipComponent } from '../../components/tooltip/tooltip';

@Component({
  selector: 'app-booster-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModalComponent, TooltipComponent],
  templateUrl: './booster-shop.component.html',
  styleUrls: ['./booster-shop.component.scss']
})
export class BoosterShopComponent implements OnInit {
  private cardsSubject = new BehaviorSubject<Card[]>([]);
  cards$ = this.cardsSubject.asObservable();
  types: string[] = [];
  selectedType: string | null = null;
  selectedRarity: string | null = null;
  selectedImage: string | null = null;
  isModalVisible: boolean = false;
  hoverType: string | null = null;
  isLoading: boolean = false;
  user: User | null = null;
  boosters = boosterMocks;
  hoveredCard: Card | null = null;

  allowedTypes: any = []

  constructor(
    private pokemonService: PokemonService, private appComponent: AppComponent, private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadCardTypes();
    this.user = this.authService.getUser();
  }

  selectRarity(rarity: string) {
    this.selectedRarity = rarity;
    this.selectedType = null;
  }

  loadCardTypes() {
    this.appComponent.showLoading();
    this.isLoading = true;
    this.pokemonService.getCardsTypes().pipe(
      tap(response => {
        this.types = response.data.map(type => type.toLowerCase());
        this.allowedTypes = pokemonTypes.filter(type =>
          this.types.includes(type.type.toLowerCase())
        );
        this.appComponent.hideLoading();
        this.isLoading = false;
      }),
      catchError(error => {
        this.appComponent.hideLoading();
        this.isLoading = false;
        console.error(error);
        return of([]);
      })
    ).subscribe();
  }

  selectType(type: string) {
    this.selectedType = type;
  }

  buyBooster() {
    if (!this.selectedRarity || !this.selectedType) return;

    const booster = this.boosters.find(b => b.rarity === this.selectedRarity);
    if (!booster) return;

    if (this.user?.money && this.user.money < booster.price) {
      alert('Você não tem dinheiro suficiente!');
      return;
    }

    this.openBooster(booster.price);
  }

  openBooster(boosterPrice: number) {
    if (!this.selectedType || !this.selectedRarity) return;
    this.cardsSubject.next([]);
    this.appComponent.showLoading();
    this.isLoading = true;

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

          // salva no usuário
          const currentUser = this.authService.getUser();
          if (currentUser) {
            currentUser.cards = [...currentUser.cards, ...baseCards, ...energyCards, ...trainerCards, ...rareCards];
            currentUser.money -= boosterPrice;
            currentUser.lastUpdate = new Date();
            this.authService.updateUser(currentUser);
          }
          this.appComponent.hideLoading();
          this.isLoading = false;
        },
        error: () => {
          this.appComponent.hideLoading();
          this.isLoading = false;
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
