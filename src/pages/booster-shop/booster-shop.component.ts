import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { getRandomElements } from '../../utils/utility';
import { CardModalComponent } from '../../components/card-modal/card-modal.component';
import { BehaviorSubject, Subscription, catchError, forkJoin, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app/app.component';
import pokemonTypes from '../../utils/pokemon-types';
import { AuthService } from '../../services/auth/auth.service';
import { TBooster, boosterMocks } from '../../utils/booster-mocks';
import { TooltipComponent } from '../../components/tooltip/tooltip';
import { TYPE, toast } from '../../utils/toast-utils';
import { TCard } from '../../models/card.model';
import { TUser } from '../../models/user.model';

@Component({
  selector: 'app-booster-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModalComponent, TooltipComponent],
  templateUrl: './booster-shop.component.html',
  styleUrls: ['./booster-shop.component.scss']
})
export class BoosterShopComponent implements OnInit {
  private cardsSubject = new BehaviorSubject<TCard[]>([]);
  cards$ = this.cardsSubject.asObservable();

  types: string[] = [];
  selectedType: string | null = null;
  selectedRarity: string | null = null;
  selectedImage: string | null = null;
  isModalVisible: boolean = false;
  hoverType: string | null = null;
  isLoading: boolean = false;
  user: TUser | null = null;
  boosters: TBooster[] = [];
  hoveredCard: TCard | null = null;

  allowedTypes: any = [];
  showSelections: boolean = true;

  private userSubscription: Subscription | null = null;

  constructor(
    private pokemonService: PokemonService, private appComponent: AppComponent, private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.boosters = boosterMocks;
    this.loadCardTypes();
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
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
      toast(TYPE.WARNING, true, 'Você não tem dinheiro suficiente!');
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
    const baseCardsQuery = this.selectedRarity === 'LEGEND'
      ? `types:${this.selectedType} ${pokemonLimit} rarity:Rare`
      : `types:${this.selectedType} ${pokemonLimit} rarity:${this.selectedRarity}`;

    const energyCards$ = this.pokemonService.searchCards('supertype:Energy subtypes:Basic');
    const trainerCards$ = this.pokemonService.searchCards('supertype:Trainer');
    const baseCards$ = this.pokemonService.searchCards(baseCardsQuery);

    forkJoin([baseCards$, trainerCards$, energyCards$]).pipe(
      tap({
        next: ([baseResponse, trainerResponse, energyResponse]) => {
          const baseCards = getRandomElements(baseResponse.data, 10);
          const energyCards = getRandomElements(energyResponse.data, 5);
          const trainerCards = getRandomElements(trainerResponse.data, 5);

          this.cardsSubject.next([...baseCards, ...energyCards, ...trainerCards]);

          const currentUser = this.authService.getUser();
          if (currentUser) {
            currentUser.cards = [...currentUser.cards, ...baseCards, ...energyCards, ...trainerCards];
            currentUser.money -= boosterPrice;
            currentUser.lastUpdate = new Date();
            this.authService.updateUser(currentUser);
          }
          toast(TYPE.SUCCESS, true, 'Booster comprado com sucesso!');
          this.appComponent.hideLoading();
          this.isLoading = false;
          this.showSelections = false;
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

  resetBoosterSelection() {
    this.selectedRarity = null;
    this.selectedType = null;
    this.showSelections = true;
    this.cardsSubject.next([]);
  }
}
