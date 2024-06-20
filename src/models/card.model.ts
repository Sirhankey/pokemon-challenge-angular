export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: IAncientTrait;
  abilities?: IAbility[];
  attacks?: IAttack[];
  weaknesses?: IWeakness[];
  resistances?: IResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: ISet;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: ILegality;
  images: ICardImage;
  tcgplayer?: ITCGPlayer;
  cardmarket?: ICardmarket;
}

export interface IAncientTrait {
  name: string;
  text: string;
}

export interface IAbility {
  name: string;
  text: string;
  type: string;
}

export interface IAttack {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface IWeakness {
  type: string;
  value: string;
}

export interface IResistance {
  type: string;
  value: string;
}

export interface ISet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: ILegality;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: ISetImage;
}

export interface ISetImage {
  symbol: string;
  logo: string;
}

export interface ILegality {
  unlimited: string;
  expanded: string;
}

export interface ICardImage {
  small: string;
  large: string;
}

export interface ITCGPlayer {
  url: string;
  updatedAt: string;
  prices: ITCGPlayerPrices;
}

export interface ITCGPlayerPrices {
  holofoil: IPrice;
}

export interface IPrice {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

export interface ICardmarket {
  url: string;
  updatedAt: string;
  prices: ICardmarketPrices;
}

export interface ICardmarketPrices {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
}
