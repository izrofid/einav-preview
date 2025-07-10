import React, { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  HiOutlineChevronUpDown,
  HiOutlineMagnifyingGlass,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { useMapStore } from "../stores/mapStore";
import type { RegionData } from "../stores/mapStore";
import mapLocations from "@/utils/generateMapLocations";

interface MapComboboxProps {
  width?: string;
  onRegionDataChange?: (
    regionId: string | null,
    regionData: RegionData | null
  ) => void;
}

const MapCombobox: React.FC<MapComboboxProps> = ({ onRegionDataChange }) => {
  const { selectedRegionId, setRegionData, setSelectedRegion } = useMapStore();
  const [query, setQuery] = useState("");

  const filteredLocations =
    query === ""
      ? mapLocations
      : mapLocations.filter(([, name]) => {
          return name.toLowerCase().includes(query.toLowerCase());
        });

  const selectedLocation = selectedRegionId
    ? mapLocations.find(([id]) => id === selectedRegionId) ?? null
    : null;

  const handleSelect = (location: [string, string]) => {
    const [regionId] = location;
    const mockData: RegionData = {
      name: location[1],
      description: `Region information for ${location[1]}`,
      visited: Math.random() > 0.5,
    };
    setSelectedRegion(regionId);
    setRegionData(mockData);
    onRegionDataChange?.(regionId, mockData);
  };

  return (
    <div className="relative group">
      <Combobox
        value={selectedLocation}
        onChange={handleSelect}
        onClose={() => setQuery("")}
        immediate={true}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <HiOutlineMagnifyingGlass className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
          </div>
          <ComboboxInput
            className="w-full bg-gradient-to-r from-white/8 to-white/12 backdrop-blur-lg border border-white/20 
              pl-12 pr-12 py-4 my-2 text-white rounded-xl shadow-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400/60
              focus:shadow-2xl focus:shadow-blue-500/20
              placeholder:text-gray-400 transition-all duration-300 
              hover:bg-gradient-to-r hover:from-white/12 hover:to-white/16
              hover:border-white/30 hover:shadow-lg"
            displayValue={(location: [string, string] | null) =>
              location ? location[1] : ""
            }
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Location selector"
            placeholder="Search locations..."
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <HiOutlineChevronUpDown className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
          </div>
        </div>
        <ComboboxOptions
          className="mt-2 w-full bg-gray-900/98 backdrop-blur-xl border border-white/20 
          rounded-xl shadow-2xl shadow-black/50 max-h-64 overflow-y-auto
          animate-in fade-in-0 zoom-in-95 duration-200"
        >
          {filteredLocations.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400">
              <HiOutlineMapPin className="mx-auto h-16 w-16 text-gray-600 mb-3 opacity-50" />
              <p className="text-lg font-medium text-gray-300 mb-1">
                No locations found
              </p>
              <p className="text-sm text-gray-500">
                Try adjusting your search term
              </p>
            </div>
          ) : (
            filteredLocations.map((location) => (
              <ComboboxOption
                key={location[0]}
                value={location}
                className="group relative cursor-pointer select-none py-4 px-5 text-gray-300 
                  data-focus:bg-gradient-to-r data-focus:from-blue-500/20 data-focus:via-purple-500/15 data-focus:to-blue-500/20 
                  data-focus:text-white transition-all duration-200 
                  first:rounded-t-xl last:rounded-b-xl
                  hover:bg-white/5 border-b border-white/5 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <HiLocationMarker className="h-5 w-5 mr-4 text-gray-500 group-data-focus:text-blue-400 transition-colors duration-200" />
                    </div>
                    <div>
                      <span className="block font-medium text-base group-data-focus:text-white transition-colors duration-200">
                        {location[1]}
                      </span>
                      <span className="text-xs text-gray-500 group-data-focus:text-blue-300 transition-colors duration-200">
                        Region ID: {location[0]}
                      </span>
                    </div>
                  </div>
                  <div className="opacity-0 group-data-focus:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

export default MapCombobox;
