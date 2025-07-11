import React from "react";
import Sidebar from "./Sidebar";
import MapSelector from "./MapSelector";
import LocationPokemonList from "./LocationPokemonList";
import PokemonLocationList from "./PokemonLocationList";
import pokeballIcon from "../assets/pokeball.svg";
import type { RegionData } from "../stores/mapStore";
import { useMapStore } from "../stores/mapStore";
import MapCombobox from "./MapCombobox";
import MonCombobox from "./MonCombobox";
import { HiMap } from 'react-icons/hi';

interface DesktopLayoutProps {
  currentRegionInfo: { id: string; data: RegionData } | null;
  onRegionDataChange: (
    regionId: string | null,
    regionData: RegionData | null
  ) => void;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  currentRegionInfo,
  onRegionDataChange,
}) => {
  const { selectedPokemonSpecies } = useMapStore();

  return (
    <div className="flex select-none bg-neutral-950 min-h-screen">
      <Sidebar>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl font-bold text-white flex items-center">
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Dex
            </span>
            Nav
          </h1>
          <img src={pokeballIcon} alt="Pokéball" className="h-6 w-6" />
        </div>
        <div className="px-2">
          <MapSelector width="" onRegionDataChange={onRegionDataChange} />
          <MapCombobox onRegionDataChange={onRegionDataChange} />
          <MonCombobox />
        </div>
      </Sidebar>
      <main
        className="flex flex-col w-full items-center p-5"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        {selectedPokemonSpecies ? (
          <div
            className={`p-4 bg-neutral-800 rounded-lg text-white h-[95dvh] overflow-y-auto mt-0 pt-0 w-full`}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#525252 #262626",
              msOverflowStyle: "auto",
            }}
          >
            <PokemonLocationList />
          </div>
        ) : currentRegionInfo ? (
          <div
            className={`p-4 bg-neutral-800 rounded-lg text-white h-[95dvh] overflow-y-auto mt-0 pt-0 w-full`}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#525252 #262626",
              msOverflowStyle: "auto",
            }}
          >
            <LocationPokemonList />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[95dvh] w-full">
            <div className="text-center px-8 py-12">
              <HiMap className="w-24 h-24 text-neutral-600 mx-auto mb-6" />
              <h2 className="text-3xl font-medium text-neutral-200 mb-4">
                Welcome to the EI DexNav
              </h2>
              <p className="text-neutral-400 text-lg mb-2">
                Choose a location from the sidebar to view Pokémon encounters
              </p>
              <p className="text-neutral-500 text-base">
                or click on a Pokémon name to see where it can be found
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DesktopLayout;
