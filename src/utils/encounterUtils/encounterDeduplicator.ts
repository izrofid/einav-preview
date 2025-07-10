import type { EncounterData } from "../../types/encounterTypes";

export const deduplicateEncounters = (encounters: EncounterData[]): EncounterData[] => {
  const grouped = new Map<string, EncounterData[]>();
  
  // Group by species
  encounters.forEach(encounter => {
    const existing = grouped.get(encounter.species) || [];
    existing.push(encounter);
    grouped.set(encounter.species, existing);
  });
  
  // Consolidate each species group
  return Array.from(grouped.entries()).map(([species, speciesEncounters]) => {
    const consolidated: EncounterData = {
      species,
      method: speciesEncounters[0].method, // All should have same method within a group
      min_level: Math.min(...speciesEncounters.map(e => e.min_level)),
      max_level: Math.max(...speciesEncounters.map(e => e.max_level)),
      slot: speciesEncounters[0].slot, // Keep first slot for reference
      encounterRate: speciesEncounters.reduce((sum, e) => sum + (e.encounterRate || 0), 0)
    };
    
    return consolidated;
  });
};
