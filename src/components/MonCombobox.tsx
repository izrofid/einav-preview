import React, { useState, useMemo } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  HiOutlineChevronUpDown,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { useMapStore } from "../stores/mapStore";
import speciesData from "@/data/speciesData.json";

interface MonComboboxProps {
  width?: string;
}

const MonCombobox: React.FC<MonComboboxProps> = () => {
  const { selectedPokemonSpecies, setSelectedPokemon } = useMapStore();
  const [query, setQuery] = useState("");

  // Create a list of all Pokemon species using speciesData.json
  const pokemonSpecies = useMemo(() => {
    return speciesData
      .map((species, index) => {
        const speciesId = index + 1; // speciesData is 0-indexed, but species IDs start at 1
        return {
          speciesName: `SPECIES_${species.nameKey.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`,
          speciesId,
          displayName: species.nameKey,
          spriteUrl: `sprites/front/${speciesId}.png`,
        };
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, []);

  const filteredPokemon = useMemo(() => {
    if (query === "") return pokemonSpecies
    return pokemonSpecies.filter(pokemon =>
      pokemon.displayName.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, pokemonSpecies]);

  const selectedPokemon = selectedPokemonSpecies
    ? pokemonSpecies.find(p => p.speciesName === selectedPokemonSpecies) ?? null
    : null;

  const handleSelect = (pokemon: typeof pokemonSpecies[0]) => {
    setSelectedPokemon(pokemon.speciesName);
  };

  return (
    <div className="relative group">
      <Combobox
        value={selectedPokemon}
        onChange={handleSelect}
        onClose={() => setQuery("")}
        virtual={{ options: filteredPokemon }}
        immediate={false}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <HiOutlineMagnifyingGlass className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
          </div>
          <ComboboxInput
            className="w-full bg-gradient-to-r from-white/8 to-white/12 backdrop-blur-lg border border-white/20 
              px-12 py-4 my-2 text-white rounded-xl shadow-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400/60
              focus:shadow-2xl focus:shadow-blue-500/20
              placeholder:text-gray-400 transition-all duration-300 
              hover:bg-gradient-to-r hover:from-white/12 hover:to-white/16
              hover:border-white/30 hover:shadow-lg"
            displayValue={(pokemon: typeof pokemonSpecies[0] | null) =>
              pokemon ? pokemon.displayName : ""
            }
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Pokemon selector"
            placeholder="Search Pokémon..."
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <HiOutlineChevronUpDown className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors cursor-pointer" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          className="w-(--input-width) bg-gray-800/80 border border-gray-500/50 backdrop-blur-xl
          rounded-md shadow-2xl h-64 shadow-black/50 [--anchor-gap:8px] overflow-y-auto z-100"
          anchor="bottom start"
        >
          {filteredPokemon.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400">
              <div className="mx-auto h-16 w-16 text-gray-600 mb-3 opacity-50">🔍</div>
              <p className="text-lg font-medium text-gray-300 mb-1">
                No Pokémon found
              </p>
              <p className="text-sm text-gray-500">
                Try adjusting your search term
              </p>
            </div>
          ) : (
            ({ option: pokemon }) => (
              <ComboboxOption
                key={pokemon.speciesName}
                value={pokemon}
                className="group relative w-full cursor-pointer select-none py-4 px-5 text-gray-300 
                  data-focus:bg-gradient-to-r data-focus:from-blue-500/20 data-focus:via-purple-500/15 data-focus:to-blue-500/20 
                  data-focus:text-white transition-all duration-200 
                  first:rounded-t-xl last:rounded-b-xl
                  hover:bg-white/5 border-b border-white/5 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={pokemon.spriteUrl}
                        alt={pokemon.displayName}
                        className="h-8 w-8 mr-4 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-base group-data-focus:text-white transition-colors duration-200">
                        {pokemon.displayName}
                      </span>
                    </div>
                  </div>
                  <div className="opacity-0 group-data-focus:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </ComboboxOption>
            )
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

export default MonCombobox;
