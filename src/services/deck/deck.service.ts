import { Injectable } from '@angular/core';
import { Deck } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private deckSubject = new BehaviorSubject<Deck[]>([]);
  decks$ = this.deckSubject.asObservable();

  constructor(
    private authService: AuthService,
  ) {
    this.loadUserDecks();
  }

  private loadUserDecks(): void {
    const user = this.authService.getUser();
    if (user) {
      this.deckSubject.next(user.decks);
    }
  }

  addDeck(deck: Deck): void {
    const user = this.authService.getUser();
    if (user) {
      user.decks.push(deck);
      this.authService.updateUser(user);
      this.deckSubject.next(user.decks);
    }
  }

  updateDeck(deck: Deck): void {
    const user = this.authService.getUser();
    if (user) {
      const index = user.decks.findIndex(d => d.id === deck.id);
      user.decks[index] = deck;
      this.authService.updateUser(user);
      this.deckSubject.next(user.decks);
    }
  }

  deleteDeck(deck: Deck): void {
    const user = this.authService.getUser();
    if (user) {
      user.decks = user.decks.filter(d => d.id !== deck.id);
      this.authService.updateUser(user);
      this.deckSubject.next(user.decks);
    }
  }

}
