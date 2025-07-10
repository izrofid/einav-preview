import wildEncounters from "@/data/wild_encounters.json";
import { mapLocations } from "@/utils/mapLocations";
import type { 
  EncounterData, 
  WildEncountersData, 
  MapEncounter, 
  EncounterField
} from "../../types/encounterTypes";

// Type the imported data
const wildEncountersData = wildEncounters as WildEncountersData;
const encounterList: MapEncounter[] = wildEncountersData.wild_encounter_groups[0].encounters;
const wildMonHeaders: EncounterField[] = wildEncountersData.wild_encounter_groups[0].fields;

export const processEncounters = (selectedRegionId: string | null) => {
  if (!selectedRegionId) return { encounters: [] };

  const encounter = encounterList.find((e: MapEncounter) => e.map === selectedRegionId);
  if (!encounter) return { encounters: [] };

  const result: EncounterData[] = [];
  
  (['land_mons', 'water_mons', 'rock_smash_mons', 'fishing_mons'] as const).forEach(method => {
    const methodData = encounter[method];
    if (methodData?.mons) {
      // Find the encounter rates for this method type
      const methodHeader = wildMonHeaders?.find((h: EncounterField) => h.type === method);
      const encounterRates = methodHeader?.encounter_rates || [];

      methodData.mons.forEach((mon, slot: number) => {
        if (mon.species) {
          result.push({
            species: mon.species,
            method,
            min_level: mon.min_level || 1,
            max_level: mon.max_level || mon.min_level || 1,
            slot,
            encounterRate: encounterRates[slot]
          });
        }
      });
    }
  });

  return { encounters: result };
};

export const getDisplayName = (selectedRegionId: string | null) => {
  if (!selectedRegionId) return "";
  const location = mapLocations.find(([mapId]) => mapId === selectedRegionId);
  return location ? location[1] : selectedRegionId;
};
