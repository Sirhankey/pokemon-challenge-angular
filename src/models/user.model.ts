import { Card } from "./card.model";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  cards:  Card[];
  decks: Deck[];
  money: number;
  createdAt: Date;
  lastLogin: Date;
}

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
  deckTypes: string[];
  pokemonsCount: number;
  trainersCount: number;
  energiesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

