export type TBooster = {
  name: string;
  price: number;
  src: string;
  rarity: string;
}

export const boosterMocks = [
  {
    name:'Commom Booster',
    price: 50,
    src:'assets/commom.png',
    rarity: 'Common'
  },
  {
    name:'Rare Booster',
    price: 100,
    src:'assets/rare.png',
    rarity: 'Rare'
  },
  {
    name:'Legendary Booster',
    price: 200,
    src:'assets/legend.png',
    rarity: 'LEGEND'
  }
]
