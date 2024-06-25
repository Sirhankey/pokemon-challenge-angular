export type TCard = {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: TAncientTrait;
  abilities?: TAbility[];
  attacks?: TAttack[];
  weaknesses?: TWeakness[];
  resistances?: TResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: TSet;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: TLegality;
  images: TCardImage;
  tcgplayer?: TTCGPlayer;
  cardmarket?: TCardmarket;
}

export type TAncientTrait = {
  name: string;
  text: string;
}

export type TAbility = {
  name: string;
  text: string;
  type: string;
}

export type TAttack = {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export type TWeakness = {
  type: string;
  value: string;
}

export type TResistance = {
  type: string;
  value: string;
}

export type TSet = {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: TLegality;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: TSetImage;
}

export type TSetImage = {
  symbol: string;
  logo: string;
}

export type TLegality = {
  unlimited: string;
  expanded: string;
}

export type TCardImage = {
  small: string;
  large: string;
}

export type TTCGPlayer = {
  url: string;
  updatedAt: string;
  prices: TTCGPlayerPrices;
}

export type TTCGPlayerPrices = {
  holofoil: TPrice;
}

export type TPrice = {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

export type TCardmarket = {
  url: string;
  updatedAt: string;
  prices: TCardmarketPrices;
}

export type TCardmarketPrices = {
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
