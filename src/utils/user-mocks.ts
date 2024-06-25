import { TUser } from "../models/user.model";

export const userMocks: TUser[] = [
  {
    id: '1',
    name: 'Ash Ketchum',
    email: 'ash@email.com',
    password: '123456',
    cards: [],
    decks: [],
    money: 1000,
    createdAt: new Date(),
    lastLogin: new Date(),
    lastUpdate: new Date()
  },
  {
    id: '3',
    name: 'Daniel Guimarães',
    email: 'daniel@email.com',
    password: '123456',
    cards: [],
    decks: [],
    money: 1000,
    createdAt: new Date(),
    lastLogin: new Date(),
    lastUpdate: new Date()
  },
  {
    id: '2',
    name: 'Misty',
    email: 'misty@water.com',
    password: '123456',
    cards: [],
    decks: [],
    money: 1000,
    createdAt: new Date(),
    lastLogin: new Date(),
    lastUpdate: new Date()
  }
];
