import { TCard } from "./card.model";

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  cards:  TCard[];
  decks: TDeck[];
  money: number;
  createdAt: Date;
  lastLogin: Date;
  lastUpdate: Date;
}

export type TDeck = {
  id: string;
  name: string;
  cards: TCard[];
  deckTypes: string[];
  pokemonsCount: number;
  trainersCount: number;
  energiesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

