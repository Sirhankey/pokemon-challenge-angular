export enum AllowedPokemonTypes {
  GRASS = 'Grass',
  FIRE = 'Fire',
  WATER = 'Water',
  LIGHTNING = 'Lightning',
  PSYCHIC = 'Psychic',
  FIGHTING = 'Fighting',
}

export const getAllAllowedPokemonTypes = (): string[] => {
  return Object.values(AllowedPokemonTypes);
};
