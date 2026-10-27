/**
 * @file PropertyGallery.jsx
 * @description Accessible image gallery with thumbnail reel, keyboard controls,
 * and fullscreen lightbox modal.
 */

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function PropertyGallery({ images = [], title = "Property" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const safeImages =
    images && images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        ];

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % safeImages.length);
  }, [safeImages.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  }, [safeImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e) {
      if (!isLightboxOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsLightboxOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleNext, handlePrev]);

  return (
    <div className="space-y-3">
      {/* Primary Display */}
      <div className="relative aspect-video md:aspect-21/9 rounded-2xl overflow-hidden bg-slate-900 group shadow-md">
        <img
          src={safeImages[selectedIndex]}
          alt={`${title} - Photo ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Counter Badge */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-medium shadow-xs">
          {selectedIndex + 1} / {safeImages.length} Photos
        </div>

        {/* Fullscreen Trigger */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 text-xs px-3 py-1.5 rounded-xl font-medium shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
          aria-label="Open fullscreen gallery"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>View All Photos</span>
        </button>

        {/* Left/Right overlay arrows (if > 1 image) */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails reel */}
      {safeImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                selectedIndex === idx
                  ? "border-blue-800 ring-2 ring-blue-800/20 scale-102"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 md:p-8">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen gallery"
              className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full cursor-pointer transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
            >
              <img
                src={safeImages[selectedIndex]}
                alt={`${title} - Photo ${selectedIndex + 1}`}
                className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />

              {safeImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </motion.div>

            <div className="absolute bottom-5 text-white/80 text-sm font-medium">
              Photo {selectedIndex + 1} of {safeImages.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
