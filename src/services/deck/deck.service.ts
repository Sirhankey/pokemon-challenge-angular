import { TDeck, TUser } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private deckSubject = new BehaviorSubject<TDeck[]>([]);
  public decks$ = this.deckSubject.asObservable();
  private user: TUser | null = null;

  constructor(
    private authService: AuthService,
  ) {
    // Subscribe to the user$ observable
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.loadUserDecks();
    });
  }

  private loadUserDecks(): void {
    if (this.user && this.user.decks) {
      this.deckSubject.next(this.user.decks);
    } else {
      this.deckSubject.next([]);
    }
  }

  addDeck(deck: TDeck): void {
    if (this.user) {
      this.user.decks.push(deck);
      this.authService.updateUser(this.user);
      this.deckSubject.next(this.user.decks);
    }
  }

  updateDeck(deck: TDeck): void {
    if (this.user) {
      const index = this.user.decks.findIndex((d: TDeck) => d.id === deck.id);
      if (index !== -1) {
        this.user.decks[index] = deck;
        this.authService.updateUser(this.user);
        this.deckSubject.next(this.user.decks);
      }
    }
  }

  deleteDeck(deck: TDeck): void {
    if (this.user) {
      this.user.decks = this.user.decks.filter((d: TDeck) => d.id !== deck.id);
      this.authService.updateUser(this.user);
      this.deckSubject.next(this.user.decks);
    }
  }
}
