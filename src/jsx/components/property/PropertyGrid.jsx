/**
 * @file PropertyGrid.jsx
 * @description Responsive multi-column grid for property listings with skeleton loading
 * and contextual empty state handling.
 */

import React from "react";
import { PropertyCard } from "./PropertyCard.jsx";
import { PropertyCardSkeleton } from "../ui/Skeleton.jsx";
import { EmptyState } from "../ui/EmptyState.jsx";

export function PropertyGrid({
  properties = [],
  loading = false,
  emptyTitle = "No matching properties found",
  emptyDescription = "Try adjusting your price range, property type, or clearing some filters.",
  onResetFilters,
  columns = 3,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <PropertyCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          actionLabel={onResetFilters ? "Reset All Filters" : undefined}
          onAction={onResetFilters}
        />
      </div>
    );
  }

  const gridColsClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-6`}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
