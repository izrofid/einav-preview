import React, { useMemo } from "react";
import { useMapStore } from "../stores/mapStore";
import {
  processPokemonEncounters,
  groupPokemonEncountersByMethod,
} from "../utils/encounterUtils/pokemonEncounterProcessor";
import { LocationGroup } from "./LocationGroup";
import speciesLabelMap from "@/data/speciesLabelMap.json";
import { getNameKey } from "@/utils/speciesData";
import { HiArrowLeft } from "react-icons/hi";
import { Button } from "@headlessui/react";

const PokemonLocationList: React.FC = () => {
  const { selectedPokemonSpecies, setSelectedPokemon } = useMapStore();

  const { locations } = useMemo(() => {
    return processPokemonEncounters(selectedPokemonSpecies);
  }, [selectedPokemonSpecies]);

  const displayName = useMemo(() => {
    if (!selectedPokemonSpecies) return "";
    const speciesId =
      speciesLabelMap[selectedPokemonSpecies as keyof typeof speciesLabelMap];
    return getNameKey(speciesId);
  }, [selectedPokemonSpecies]);

  const spriteUrl = useMemo(() => {
    if (!selectedPokemonSpecies) return "";
    const speciesId =
      speciesLabelMap[selectedPokemonSpecies as keyof typeof speciesLabelMap];
    return `sprites/front/${speciesId}.png`;
  }, [selectedPokemonSpecies]);

  if (!selectedPokemonSpecies) {
    return (
      <div className="text-gray-400 text-center">
        Select a Pokémon to view locations
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-neutral-200 mb-2">
            No Location Data
          </h2>
          <p className="text-neutral-400">
            There are no recorded encounters for this Pokémon
          </p>
        </div>
      </div>
    );
  }

  // Group locations by method type
  const groupedLocations = groupPokemonEncountersByMethod(locations);

  return (
    <div className="mt-4">
      <div className="sticky top-0 z-10 bg-zinc-800 pb-2 mb-2 -mt-4 pt-4 -mx-4 px-4 shadow-md flex gap-2 items-center">
        <Button
          onClick={() => setSelectedPokemon(null)}
          className="flex items-center text-gray-400 hover:text-white transition-colors mr-2 cursor-pointer"
          title="Back to location view"
        >
          <HiArrowLeft className="w-5 h-5" />
        </Button>
        <img
          src={spriteUrl}
          alt={displayName}
          className="w-8 h-8 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <span className="text-xl font-semibold text-white mb-0.5">
          {displayName || "Unknown Pokémon"}
        </span>
      </div>

      <LocationGroup
        locations={groupedLocations.land_mons}
        title="Land Encounters"
        bgColor="#2E8B57"
      />
      <LocationGroup
        locations={groupedLocations.water_mons}
        title="Surf Encounters"
        bgColor="#3148f5"
      />
      <LocationGroup
        locations={groupedLocations.fishing_old_rod}
        title="Old Rod"
        bgColor="#09bdb4"
      />
      <LocationGroup
        locations={groupedLocations.fishing_good_rod}
        title="Good Rod"
        bgColor="#4A90E2"
      />
      <LocationGroup
        locations={groupedLocations.fishing_super_rod}
        title="Super Rod"
        bgColor="#9932CC"
      />
      <LocationGroup
        locations={groupedLocations.rock_smash_mons}
        title="Rock Smash"
        bgColor="#D0021B"
      />
    </div>
  );
};

export default PokemonLocationList;
