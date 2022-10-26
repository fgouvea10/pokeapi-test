export interface PokemonType {
  id: string;
  name: string;
  img: string;
  species: string;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}
