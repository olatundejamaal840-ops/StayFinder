/**
 * @file EmptyState.jsx
 * @description Engaging, actionable empty state component for search and lists.
 */

import React from "react";
import { Home } from "lucide-react";
import { Button } from "./Button.jsx";

export function EmptyState({
  icon: Icon = Home,
  title = "No properties found",
  description = "Try adjusting your filters, searching for another location, or resetting your criteria.",
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-2xl border border-slate-200/80 shadow-xs max-w-lg mx-auto ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 border border-blue-100">
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 font-display mb-1.5">
        {title}
      </h3>

      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {actionLabel && onAction && (
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <Button variant="secondary" size="md" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
