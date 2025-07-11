import React, { useState } from 'react';
import MapSelector from './MapSelector';
import LocationPokemonList from './LocationPokemonList';
import PokemonLocationList from './PokemonLocationList';
import pokeballIcon from '@/assets/pokeball.svg'
import type { RegionData } from '../stores/mapStore';
import { useMapStore } from '../stores/mapStore';
import MapCombobox from './MapCombobox';
import MonCombobox from './MonCombobox';
import { HiMap, HiX } from 'react-icons/hi';

interface MobileLayoutProps {
  onRegionDataChange: (regionId: string | null, regionData: RegionData | null) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ onRegionDataChange }) => {
  const { selectedPokemonSpecies, selectedRegionId, clearSelection } = useMapStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleClearSelection = () => {
    clearSelection();
    onRegionDataChange(null, null);
  };

  return (
    <div className="sm:hidden flex flex-col h-screen bg-zinc-800">
      {/* Header with title and drawer button */}
      <div className="flex items-center justify-between p-4 bg-zinc-800">
        <div className="flex text-lg font-bold text-white items-center gap-3">
          <div className=''><span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Dex</span>Nav</div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDrawer}
              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors text-sm font-medium text-white"
            >
              <HiMap className="w-4 h-4" />
              Map
            </button>
            {(selectedRegionId || selectedPokemonSpecies) && (
              <button
                onClick={handleClearSelection}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium text-white"
                title="Clear selection"
              >
                <HiX className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>
        <img src={pokeballIcon} alt="Pokéball" className="h-6 w-6" />
      </div>

      {/* Content with Pokémon list */}
      <div className="flex-1 overflow-y-auto px-4 scrollbar-themed">
        {selectedPokemonSpecies ? (
          <PokemonLocationList />
        ) : selectedRegionId ? (
          <LocationPokemonList />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-6 py-8">
              <HiMap className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-neutral-200 mb-2">
                Welcome to the EI DexNav
              </h2>
              <p className="text-neutral-400 mb-4">
                Select a location or pokemon on the map
              </p>
              <button
                onClick={toggleDrawer}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
              >
                <HiMap className="w-4 h-4" />
                Open Map
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Drawer overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 flex"
          onClick={closeDrawer}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" />
          
          {/* Drawer */}
          <div 
            className="relative flex flex-col w-full max-w-sm bg-neutral-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-700">
              <h2 className="text-lg font-semibold text-white">Select Location</h2>
              <button
                onClick={closeDrawer}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
            
            {/* Drawer content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <MapSelector width="" onRegionDataChange={onRegionDataChange} />
              <MapCombobox/>
              <MonCombobox />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileLayout;
