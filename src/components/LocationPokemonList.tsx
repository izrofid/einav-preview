import React, { useMemo } from "react";
import { useMapStore } from "../stores/mapStore";
import { processEncounters, getDisplayName } from "../utils/encounterUtils/encounterProcessor";
import { groupEncountersByMethod } from "../utils/encounterUtils/encounterGrouper";
import { MethodGroup } from "./MethodGroup";
import { HiLocationMarker } from "react-icons/hi";

const LocationPokemonList: React.FC = () => {
  const { selectedRegionId } = useMapStore();

  const { encounters } = useMemo(() => {
    return processEncounters(selectedRegionId);
  }, [selectedRegionId]);

  const displayName = useMemo(() => {
    return getDisplayName(selectedRegionId);
  }, [selectedRegionId]);

  if (!selectedRegionId) {
    return (
      <div className="text-gray-400 text-center">
        Select a location to view Pokémon
      </div>
    );
  }

  if (encounters.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-neutral-200 mb-2">
            No Pokémon Data
          </h2>
          <p className="text-neutral-400">
            There are no recorded encounters at this location
          </p>
        </div>
      </div>
    );
  }

  // Group encounters by method type
  const groupedEncounters = groupEncountersByMethod(encounters);

  return (
    <div className="mt-4">
      <div className="sticky top-0 z-10 bg-zinc-800 pb-2 mb-2 -mt-4 pt-4 -mx-4 px-4 shadow-md flex gap-2 items-center">
        <HiLocationMarker/><span className="text-xl font-semibold text-white mb-0.5">
          {displayName || "Unknown Location"}
        </span>
      </div>

      <MethodGroup
        encounters={groupedEncounters.land_mons}
        title="Land Encounters"
        bgColor="#2E8B57"
      />
      <MethodGroup
        encounters={groupedEncounters.water_mons}
        title="Surf Encounters"
        bgColor="#3148f5"
      />
      <MethodGroup
        encounters={groupedEncounters.fishing_old_rod}
        title="Old Rod"
        bgColor="#09bdb4"
      />
      <MethodGroup
        encounters={groupedEncounters.fishing_good_rod}
        title="Good Rod"
        bgColor="#4A90E2"
      />
      <MethodGroup
        encounters={groupedEncounters.fishing_super_rod}
        title="Super Rod"
        bgColor="#9932CC"
      />
      <MethodGroup
        encounters={groupedEncounters.rock_smash_mons}
        title="Rock Smash"
        bgColor="#D0021B"
      />
    </div>
  );
};

export default LocationPokemonList;
