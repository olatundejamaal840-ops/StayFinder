/**
 * @file PropertyFilters.jsx
 * @description Comprehensive, active filter control panel with Buy/Rent switch,
 * price ranges, property types, bedroom count, amenities, active chips, and reset action.
 */

import React, { useState } from "react";
import { X, Filter, RotateCcw, Check, MapPin } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { Select } from "../ui/Select.jsx";
import { Input } from "../ui/Input.jsx";
import { AMENITIES_OPTIONS } from "../../../js/data/demoProperties.js";
import { getStateOptions, getAreasForState } from "../../../js/data/nigerianStates.js";

export function PropertyFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0,
}) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const stateOptions = getStateOptions();
  const areaOptions = getAreasForState(filters.state || filters.city);

  const typeOptions = [
    { value: "all", label: "All Property Types" },
    { value: "Apartment", label: "Apartment" },
    { value: "Duplex", label: "Duplex" },
    { value: "Penthouse", label: "Penthouse" },
    { value: "Terrace", label: "Terrace" },
    { value: "Detached House", label: "Detached Mansion" },
    { value: "Studio", label: "Studio" },
  ];

  const bedroomOptions = [
    { value: "any", label: "Any Bedrooms" },
    { value: "1", label: "1+ Bedrooms" },
    { value: "2", label: "2+ Bedrooms" },
    { value: "3", label: "3+ Bedrooms" },
    { value: "4", label: "4+ Bedrooms" },
    { value: "5", label: "5+ Bedrooms" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest Listings" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "verified", label: "Verified Landlords First" },
  ];

  function handleTransactionChange(type) {
    onFilterChange({ ...filters, transactionType: type });
  }

  function handleStateChange(newState) {
    onFilterChange({
      ...filters,
      state: newState,
      city: newState,
      area: "all"
    });
  }

  function handleAmenityToggle(amenity) {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onFilterChange({ ...filters, amenities: updated });
  }

  function removeFilterChip(key, value) {
    if (key === "amenities") {
      onFilterChange({
        ...filters,
        amenities: filters.amenities.filter((a) => a !== value),
      });
    } else if (key === "state" || key === "city") {
      onFilterChange({ ...filters, state: "all", city: "all", area: "all" });
    } else if (key === "area") {
      onFilterChange({ ...filters, area: "all" });
    } else if (key === "propertyType") {
      onFilterChange({ ...filters, [key]: "all" });
    } else if (key === "bedrooms") {
      onFilterChange({ ...filters, bedrooms: "any" });
    } else {
      onFilterChange({ ...filters, [key]: "" });
    }
  }

  // Active filter chips calculation
  const activeChips = [];
  if (filters.state && filters.state !== "all") {
    activeChips.push({ key: "state", label: `State: ${filters.state}` });
  } else if (filters.city && filters.city !== "all") {
    activeChips.push({ key: "city", label: `Location: ${filters.city}` });
  }
  if (filters.area && filters.area !== "all") {
    activeChips.push({ key: "area", label: `Area: ${filters.area}` });
  }
  if (filters.propertyType && filters.propertyType !== "all") {
    activeChips.push({ key: "propertyType", label: `Type: ${filters.propertyType}` });
  }
  if (filters.minPrice) {
    activeChips.push({ key: "minPrice", label: `Min: ₦${Number(filters.minPrice).toLocaleString()}` });
  }
  if (filters.maxPrice) {
    activeChips.push({ key: "maxPrice", label: `Max: ₦${Number(filters.maxPrice).toLocaleString()}` });
  }
  if (filters.bedrooms && filters.bedrooms !== "any") {
    activeChips.push({ key: "bedrooms", label: `${filters.bedrooms}+ Beds` });
  }
  (filters.amenities || []).forEach((amenity) => {
    activeChips.push({ key: "amenities", value: amenity, label: amenity });
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs mb-8 text-left">
      {/* Top Bar: Transaction Type switcher + Sort dropdown */}
      <div className="flex flex-col gap-3 pb-4 border-b border-slate-100">
        {/* Buy / Rent pill tabs */}
        <div className="flex p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => handleTransactionChange("all")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
              filters.transactionType === "all" || !filters.transactionType
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleTransactionChange("rent")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
              filters.transactionType === "rent"
                ? "bg-blue-600 text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            To Rent
          </button>
          <button
            type="button"
            onClick={() => handleTransactionChange("sale")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
              filters.transactionType === "sale"
                ? "bg-slate-900 text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            For Sale
          </button>
        </div>

        {/* Results Counter & Sort */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Verified Listings: <strong className="text-slate-900">{totalResults}</strong>
            </span>
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="md:hidden flex items-center gap-1 text-xs text-blue-600 font-bold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{isMobileDrawerOpen ? "Hide Filters" : "Show Filters"}</span>
            </button>
          </div>

          <Select
            label="Sort By"
            id="sort-select"
            value={filters.sortBy || "newest"}
            onChange={(e) =>
              onFilterChange({ ...filters, sortBy: e.target.value })
            }
            options={sortOptions}
            placeholder=""
          />
        </div>
      </div>

      {/* Main Filter Inputs (Responsive Vertical Sidebar Stack) */}
      <div className={`pt-4 ${isMobileDrawerOpen ? "block" : "hidden md:block"}`}>
        <div className="grid grid-cols-1 gap-3.5 mb-4">
          <Select
            label="Nigeria State"
            id="state-filter"
            value={filters.state || filters.city || "all"}
            onChange={(e) => handleStateChange(e.target.value)}
            options={stateOptions}
            placeholder=""
          />

          <Select
            label="Area / Neighborhood"
            id="area-filter"
            value={filters.area || "all"}
            onChange={(e) =>
              onFilterChange({ ...filters, area: e.target.value })
            }
            options={areaOptions}
            placeholder=""
          />

          <Select
            label="Property Type"
            id="type-filter"
            value={filters.propertyType || "all"}
            onChange={(e) =>
              onFilterChange({ ...filters, propertyType: e.target.value })
            }
            options={typeOptions}
            placeholder=""
          />

          <Select
            label="Bedrooms"
            id="bedrooms-filter"
            value={filters.bedrooms || "any"}
            onChange={(e) =>
              onFilterChange({ ...filters, bedrooms: e.target.value })
            }
            options={bedroomOptions}
            placeholder=""
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Min Price (₦)"
              id="min-price-filter"
              type="number"
              placeholder="Min ₦"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, minPrice: e.target.value })
              }
            />
            <Input
              label="Max Price (₦)"
              id="max-price-filter"
              type="number"
              placeholder="Max ₦"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>
        </div>

        {/* Amenities Checkbox Pill Row */}
        <div className="pt-2 pb-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Essential Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES_OPTIONS.slice(0, 8).map((amenity) => {
              const isChecked = (filters.amenities || []).includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                    isChecked
                      ? "bg-blue-900 text-white border-blue-900 shadow-2xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 text-white" />}
                  <span>{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Filter Chips & Reset All Action */}
      {activeChips.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">
            Active Filters:
          </span>

          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 text-xs px-2.5 py-1 rounded-full border border-blue-200 font-medium"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={() => removeFilterChip(chip.key, chip.value)}
                className="text-blue-600 hover:text-blue-900 p-0.5 rounded-full cursor-pointer"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 font-semibold ml-auto transition-colors cursor-pointer py-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}
    </div>
  );
}
