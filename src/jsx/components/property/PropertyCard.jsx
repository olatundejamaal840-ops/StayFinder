/**
 * @file PropertyCard.jsx
 * @description High-aesthetic real estate listing card with photo carousel,
 * verification badge, pricing, specifications, and instant save interaction.
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Bed, Bath, Maximize2, MapPin, Heart, ShieldCheck } from "lucide-react";
import { formatCurrency, formatArea } from "../../../js/utils/formatters.js";
import { useFavourites } from "../../../js/store/FavouritesContext.jsx";
import { useAuth } from "../../../js/store/AuthContext.jsx";
import { useToast } from "../../../js/store/ToastContext.jsx";
import { Badge } from "../ui/Badge.jsx";

export function PropertyCard({ property }) {
  const { isSaved, toggleSaved } = useFavourites();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  if (!property) return null;

  const saved = isSaved(property.id);
  const isRent = property.transactionType === "rent";

  function handleSelectProperty(e) {
    if (!user) {
      e.preventDefault();
      addToast(
        `Please sign in as a Property Seeker to ${isRent ? "rent" : "buy"} this verified home.`,
        "info"
      );
      navigate(
        `/login?role=seeker&returnTo=${encodeURIComponent(
          `/properties/${property.id}`
        )}&action=${property.transactionType}`
      );
    }
  }

  function handleSaveClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const isNowSaved = toggleSaved(property.id);
    addToast(
      isNowSaved
        ? `Added "${property.title.slice(0, 32)}..." to your saved properties.`
        : `Removed from saved properties.`,
      isNowSaved ? "success" : "info"
    );
  }
  const primaryImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col h-full text-left"
    >
      {/* Visual Header / Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <Link
          to={`/properties/${property.id}`}
          onClick={handleSelectProperty}
          className="block w-full h-full"
        >
          <img
            src={primaryImage}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center pointer-events-none">
          <Badge variant={isRent ? "rent" : "sale"} size="sm">
            {isRent ? "For Rent" : "For Sale"}
          </Badge>

          {property.verificationStatus === "verified" && (
            <span className="inline-flex items-center gap-1 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Verified
            </span>
          )}
        </div>

        {/* Quick Favourite Toggle Button */}
        <button
          type="button"
          onClick={handleSaveClick}
          aria-label={saved ? "Remove from favourites" : "Save property to favourites"}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-slate-700 hover:text-red-600 flex items-center justify-center shadow-md transition-transform duration-150 active:scale-90 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              saved ? "fill-red-500 text-red-500" : "text-slate-600"
            }`}
          />
        </button>

        {/* Property Type Floating Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-slate-900/75 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xl font-bold text-slate-900 font-display">
              {formatCurrency(property.price, property.currency, property.rentPeriod)}
            </span>
          </div>

          {/* Title */}
          <Link
            to={`/properties/${property.id}`}
            onClick={handleSelectProperty}
            className="block group-hover:text-blue-600 transition-colors"
          >
            <h3 className="font-semibold text-slate-900 line-clamp-1 text-base leading-snug mb-1">
              {property.title}
            </h3>
          </Link>

          {/* Location Area */}
          <p className="flex items-center text-xs text-slate-500 gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">
              {property.location.area}, {property.location.state && property.location.state !== property.location.city ? `${property.location.city}, ${property.location.state}` : (property.location.state || property.location.city)}
            </span>
          </p>
        </div>

        {/* Specifications Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-1" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bedrooms} bds</span>
            </span>
            <span className="flex items-center gap-1" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bathrooms} ba</span>
            </span>
            <span className="flex items-center gap-1" title="Area size">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatArea(property.size, property.sizeUnit)}</span>
            </span>
          </div>

          <Link
            to={`/properties/${property.id}`}
            onClick={handleSelectProperty}
            className="text-[11px] text-blue-700 font-semibold bg-blue-50 hover:bg-blue-600 hover:text-white px-2.5 py-1 rounded-md transition-colors"
          >
            {isRent ? "Rent Now" : "Buy Now"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
