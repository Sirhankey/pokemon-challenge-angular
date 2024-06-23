import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Deck, User } from '../../models/user.model';
import { Card } from '../../models/card.model';
import { DeckService } from '../../services/deck/deck.service';
import { AuthService } from '../../services/auth/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { DeckStatsComponent } from '../../components/deck-stats/deck-stats.component';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-deck-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DeckStatsComponent],
  templateUrl: './deck-manager.component.html',
  styleUrls: ['./deck-manager.component.scss']
})
export class DeckManagerComponent implements OnInit, AfterViewInit {
  decks: Deck[] = [];
  selectedDeck: Deck | null = null;
  newDeckName: string = '';
  userCards: Card[] = [];
  selectedCards: Card[] = [];
  filteredUserCards: Card[] = [];
  paginatedUserCards: Card[] = [];
  maxDeckSize = 60;
  minDeckSize = 24;
  user: User | null = null;
  cardTypeFilter: string = '';
  typeFilter: string = '';
  showNewDeckInput: boolean = false;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;

  panelOpenState: boolean = false;

  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel | undefined;

  constructor(
    private deckService: DeckService, private authService: AuthService
  ) { }

  ngOnInit() {
    this.deckService.decks$.subscribe(decks => {
      this.decks = decks;
    });
    this.user = this.authService.getUser();
    if (this.user?.cards) {
      this.userCards = this.user.cards;
      this.filterCards();
    }
  }

  ngAfterViewInit() {
    if (!this.expansionPanel) return;
    this.expansionPanel.afterExpand.subscribe(() => this.panelOpenState = true);
    this.expansionPanel.afterCollapse.subscribe(() => this.panelOpenState = false);
  }

  toggleNewDeckInput() {
    this.showNewDeckInput = !this.showNewDeckInput;
  }

  createDeck() {
    if (this.newDeckName.trim().length === 0) {
      alert('O nome do baralho não pode estar vazio');
      return;
    }

    if (this.decks.find(d => d.name === this.newDeckName)) {
      alert('O nome do baralho já existe');
      return;
    }

    const newDeck: Deck = {
      id: uuidv4(),
      name: this.newDeckName,
      cards: [],
      deckTypes: [],
      pokemonsCount: 0,
      trainersCount: 0,
      energiesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.decks.push(newDeck);
    this.newDeckName = '';
    this.showNewDeckInput = false;
    this.selectDeck(newDeck);
  }

  selectDeck(deck: Deck): void {
    this.selectedDeck = deck;
    this.selectedCards = deck.cards;
    this.sortSelectedCards();
  }

  removeDeck(deck: Deck): void {
    this.decks = this.decks.filter(d => d.id !== deck.id);
    if (this.selectedDeck?.id === deck.id) {
      this.selectedDeck = null;
      this.selectedCards = [];
    }
    this.deckService.deleteDeck(deck);
  }

  addCardToDeck(card: Card): void {
    if (this.selectedDeck) {
      const sameCards = this.selectedCards.filter(c => c.name === card.name);
      if (sameCards.length < 4 && this.selectedCards.length < this.maxDeckSize) {
        this.selectedCards.push({ ...card });
        this.userCards = this.userCards.filter(c => c !== card);
        this.filterCards();
        this.updateDeckCounts();
        this.sortSelectedCards();
      } else if (sameCards.length >= 4) {
        alert('Você só pode ter no máximo 4 cartas com o mesmo nome no baralho.');
      } else {
        alert('Você atingiu o tamanho máximo do baralho.');
      }
    }
  }

  removeCardFromDeck(card: Card): void {
    if (this.selectedDeck) {
      this.selectedCards = this.selectedCards.filter(c => c !== card);
      this.userCards.push(card);
      this.filterCards();
      this.updateDeckCounts();
      this.sortSelectedCards();
    }
  }

  saveDeck(): void {
    if (this.selectedDeck) {
      if (this.selectedCards.length < this.minDeckSize) {
        alert('O baralho deve ter no mínimo 24 cartas.');
        return;
      }

      this.selectedDeck.cards = this.selectedCards;
      this.selectedDeck.updatedAt = new Date();

      const deckIndex = this.decks.findIndex(d => d.id === this.selectedDeck?.id);
      if (deckIndex !== -1) {
        this.decks[deckIndex] = this.selectedDeck;
        this.deckService.updateDeck(this.selectedDeck);
      }

      this.selectedDeck = null;
      this.selectedCards = [];
    }
  }

  viewDeckDetails(deck: Deck): void {
    this.selectDeck(deck);
  }

  filterCards(): void {
    this.filteredUserCards = this.userCards.filter(card => {
      return (this.cardTypeFilter === '' || card.supertype === this.cardTypeFilter) &&
        (this.typeFilter === '' || card.types?.includes(this.typeFilter));
    });
    this.totalPages = Math.ceil(this.filteredUserCards.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedUserCards();
  }

  updatePaginatedUserCards(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUserCards = this.filteredUserCards.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUserCards();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUserCards();
    }
  }

  private updateDeckCounts(): void {
    if (this.selectedDeck) {
      this.selectedDeck.pokemonsCount = this.selectedCards.filter(c => c.supertype === 'Pokémon').length;
      this.selectedDeck.trainersCount = this.selectedCards.filter(c => c.supertype === 'Trainer').length;
      this.selectedDeck.energiesCount = this.selectedCards.filter(c => c.supertype === 'Energy').length;
      this.selectedDeck.deckTypes = [...new Set(this.selectedCards.flatMap(c => c.types))].filter((type): type is string => type !== undefined);
    }
  }

  private sortSelectedCards(): void {
    // Ordena os cartões com base no supertype e, se for Pokémon, pelo nationalPokedexNumbers
    this.selectedCards.sort((a, b) => {
      const order = ['Pokémon', 'Trainer', 'Energy'];
      const typeComparison = order.indexOf(a.supertype) - order.indexOf(b.supertype);
      if (typeComparison === 0 && a.supertype === 'Pokémon' && b.supertype === 'Pokémon') {
        const aPokedexNumber = a.nationalPokedexNumbers ? a.nationalPokedexNumbers[0] : 0;
        const bPokedexNumber = b.nationalPokedexNumbers ? b.nationalPokedexNumbers[0] : 0;
        return aPokedexNumber - bPokedexNumber;
      }
      return typeComparison;
    });
  }

  onPanelStateChange(state: boolean) {
    console.log('panel state changed', state);
    this.panelOpenState = state;
  }
}
