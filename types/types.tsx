export interface Pokemon {
    order: number;
    name: string;
    sprites: {
        front_default: string;
        front_shiny: string;
    };
    types: [
        {
            type: {
                name: string;
            }
        }
    ];
    stats: [
        {
            base_stat: number;
            stat: {
                name: string;
            }
        }
    ];
    evolution_chain: {
        url: string;
    };
    height: number;
    weight: number;
    flavor_text_entries: [
        {
            flavor_text: string
            language: { name: string }
        }
    ];
    url: string;
    is_legendary: boolean;
}

export interface PokemonListProps {
    pokemon: Pokemon;
}