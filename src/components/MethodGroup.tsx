import React from "react";
import speciesLabelMap from "@/data/speciesLabelMap.json";
import { getNameKey } from "@/utils/speciesData";
import { useMapStore } from "../stores/mapStore";
import type { EncounterData } from "../types/encounterTypes";

interface MethodGroupProps {
  encounters: EncounterData[];
  title: string;
  bgColor: string;
}

export const MethodGroup: React.FC<MethodGroupProps> = ({
  encounters,
  title,
  bgColor,
}) => {
  const { setSelectedPokemon } = useMapStore();

  if (encounters.length === 0) return null;

  return (
    <div className="mb-6">
      <div
        className="text-white font-semibold py-2 px-3 rounded-t-md flex items-center space-x-2"
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-lg">{title}</span>
      </div>

      <div className="bg-neutral-800 rounded-b-md overflow-hidden">
        <div className="divide-y divide-neutral-700">
          {encounters.map((encounter, idx) => {
            const speciesId =
              speciesLabelMap[
                encounter.species as keyof typeof speciesLabelMap
              ];
            const pokemonName = getNameKey(speciesId);
            const spriteUrl = `sprites/front/${speciesId}.png`;

            return (
              <div key={idx} className="p-3">
                <div className="flex items-center">
                  <div onClick={() => setSelectedPokemon(encounter.species)} className="cursor-pointer">
                    <img
                      src={spriteUrl}
                      alt={pokemonName}
                      className="w-12 h-12 mr-3 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                  <div
                    className="text-white font-medium cursor-pointer hover:text-blue-300 transition-colors"
                    onClick={() => setSelectedPokemon(encounter.species)}
                  >
                    {pokemonName}
                  </div>
                  <div className="ml-auto flex flex-row-reverse gap-2 items-center text-sm text-gray-300">
                    {encounter.encounterRate && (
                      <div className="bg-gray-700 text-gray-300 rounded-full px-2 py-1 text-xs w-13 justify-center flex">
                        {encounter.encounterRate}%
                      </div>
                    )}
                    <span className="bg-zinc-900 rounded-full px-2 py-1 text-xs w-22 justify-center flex">
                      Lv. {encounter.min_level}
                      {encounter.max_level !== encounter.min_level
                        ? ` - ${encounter.max_level}`
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
