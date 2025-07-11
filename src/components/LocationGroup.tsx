import React from "react";
import type { PokemonLocationData } from "../types/encounterTypes";

interface LocationGroupProps {
  locations: PokemonLocationData[];
  title: string;
  bgColor: string;
}

export const LocationGroup: React.FC<LocationGroupProps> = ({
  locations,
  title,
  bgColor,
}) => {
  if (locations.length === 0) return null;

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
          {locations.map((location, idx) => {
            return (
              <div key={idx} className="p-3">
                <div className="flex items-center">
                  <div className="text-white font-medium">{location.locationName}</div>
                  <div className="ml-auto flex flex-row-reverse gap-2 items-center text-sm text-gray-300">
                    {location.encounterRate && (
                      <div className="bg-gray-700 text-gray-300 rounded-full px-2 py-1 text-xs w-13 justify-center flex">
                        {location.encounterRate}%
                      </div>
                    )}
                    <span className="bg-zinc-900 rounded-full px-2 py-1 text-xs w-22 justify-center flex">
                      Lv. {location.min_level}
                      {location.max_level !== location.min_level
                        ? ` - ${location.max_level}`
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
