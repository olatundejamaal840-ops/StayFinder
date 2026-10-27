/**
 * @file SearchPage.jsx
 * @description Marketplace discovery and search page with reactive filters,
 * live count, filter tags, and responsive property grid.
 */

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { getProperties } from "../../js/services/propertyService.js";
import { PropertyFilters } from "../components/property/PropertyFilters.jsx";
import { PropertyGrid } from "../components/property/PropertyGrid.jsx";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL parameters
  const [filters, setFilters] = useState(() => ({
    transactionType: searchParams.get("type") || "all",
    state: searchParams.get("state") || "all",
    city: searchParams.get("city") || "all",
    area: searchParams.get("area") || "all",
    propertyType: searchParams.get("propertyType") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "any",
    amenities: searchParams.getAll("amenities") || [],
    searchQuery: searchParams.get("q") || "",
    sortBy: searchParams.get("sortBy") || "newest"
  }));

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync state when URL params change externally (e.g. navigation)
  useEffect(() => {
    setFilters({
      transactionType: searchParams.get("type") || "all",
      state: searchParams.get("state") || "all",
      city: searchParams.get("city") || "all",
      area: searchParams.get("area") || "all",
      propertyType: searchParams.get("propertyType") || "all",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      bedrooms: searchParams.get("bedrooms") || "any",
      amenities: searchParams.getAll("amenities") || [],
      searchQuery: searchParams.get("q") || "",
      sortBy: searchParams.get("sortBy") || "newest"
    });
  }, [searchParams]);

  // Fetch properties when filters change
  useEffect(() => {
    let isMounted = true;
    async function fetchListings() {
      setLoading(true);
      try {
        const results = await getProperties(filters);
        if (isMounted) {
          setProperties(results);
        }
      } catch (err) {
        console.error("Failed to fetch search properties", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchListings();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  // Handler to update filters and push to URL
  function handleFilterChange(newFilters) {
    setFilters(newFilters);

    const nextParams = new URLSearchParams();
    if (newFilters.transactionType && newFilters.transactionType !== "all") {
      nextParams.set("type", newFilters.transactionType);
    }
    if (newFilters.state && newFilters.state !== "all") {
      nextParams.set("state", newFilters.state);
    }
    if (newFilters.city && newFilters.city !== "all") {
      nextParams.set("city", newFilters.city);
    }
    if (newFilters.area && newFilters.area !== "all") {
      nextParams.set("area", newFilters.area);
    }
    if (newFilters.propertyType && newFilters.propertyType !== "all") {
      nextParams.set("propertyType", newFilters.propertyType);
    }
    if (newFilters.minPrice) nextParams.set("minPrice", newFilters.minPrice);
    if (newFilters.maxPrice) nextParams.set("maxPrice", newFilters.maxPrice);
    if (newFilters.bedrooms && newFilters.bedrooms !== "any") {
      nextParams.set("bedrooms", newFilters.bedrooms);
    }
    if (newFilters.searchQuery) nextParams.set("q", newFilters.searchQuery);
    if (newFilters.sortBy) nextParams.set("sortBy", newFilters.sortBy);

    (newFilters.amenities || []).forEach((amenity) => {
      nextParams.append("amenities", amenity);
    });

    setSearchParams(nextParams);
  }

  function handleResetFilters() {
    const cleanFilters = {
      transactionType: "all",
      state: "all",
      city: "all",
      area: "all",
      propertyType: "all",
      minPrice: "",
      maxPrice: "",
      bedrooms: "any",
      amenities: [],
      searchQuery: "",
      sortBy: "newest"
    };
    handleFilterChange(cleanFilters);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Top Banner & Search Query Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Verified Property Listings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse physically inspected homes and apartments in Lagos & Abuja.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) =>
              handleFilterChange({ ...filters, searchQuery: e.target.value })
            }
            placeholder="Search title, neighborhood, city..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Main Search Layout: Sidebar Filters + Property Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Column: Filter Panel */}
        <div className="lg:col-span-1">
          <PropertyFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={properties.length}
          />
        </div>

        {/* Right Column: Results Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Status summary */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900">{properties.length}</strong> verified properties
            </span>
            {loading && <span className="text-blue-600 animate-pulse font-medium">Updating...</span>}
          </div>

          {/* Grid */}
          <PropertyGrid
            properties={properties}
            loading={loading}
            onResetFilters={handleResetFilters}
            columns={3}
          />
        </div>
      </div>
    </div>
  );
}
