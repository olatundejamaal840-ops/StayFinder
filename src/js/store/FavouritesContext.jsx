/**
 * @file FavouritesContext.jsx
 * @description Provides reactive state for saved/favourited properties.
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSavedPropertyIds, toggleSavedProperty } from "../services/favouritesService.js";
import { useAuth } from "./AuthContext.jsx";

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id || "guest";

  const [savedIds, setSavedIds] = useState(() => getSavedPropertyIds(userId));

  useEffect(() => {
    setSavedIds(getSavedPropertyIds(userId));
  }, [userId]);

  function isSaved(propertyId) {
    return savedIds.includes(propertyId);
  }

  function toggleSaved(propertyId) {
    const isNowSaved = toggleSavedProperty(propertyId, userId);
    setSavedIds((prev) => {
      if (isNowSaved) {
        return [...prev, propertyId];
      }
      return prev.filter((id) => id !== propertyId);
    });
    return isNowSaved;
  }

  return (
    <FavouritesContext.Provider
      value={{
        savedIds,
        savedCount: savedIds.length,
        isSaved,
        toggleSaved,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
}
