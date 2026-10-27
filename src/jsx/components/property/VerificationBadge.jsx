/**
 * @file VerificationBadge.jsx
 * @description Trust badge indicating StayFinder physical & document verification status.
 */

import React from "react";
import { ShieldCheck, ShieldAlert, Clock } from "lucide-react";

export function VerificationBadge({
  status = "verified",
  showLabel = true,
  className = "",
  size = "md",
}) {
  const isVerified = status === "verified";
  const isPending = status === "pending";

  if (isVerified) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full shadow-2xs ${
          size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
        } ${className}`}
        title="Verified: Physical property inspection & title deeds checked by StayFinder"
      >
        <ShieldCheck className={`${size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} text-blue-600`} />
        {showLabel && <span>Verified Landlord</span>}
      </div>
    );
  }

  if (isPending) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 font-medium bg-slate-100 text-slate-700 border border-slate-200 rounded-full ${
          size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
        } ${className}`}
        title="Verification Pending: Documentation currently being audited"
      >
        <Clock className={`${size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} text-slate-500`} />
        {showLabel && <span>Pending Verification</span>}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-medium bg-slate-100 text-slate-600 border border-slate-200 rounded-full ${
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      } ${className}`}
      title="Unverified Listing"
    >
      <ShieldAlert className={`${size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} text-slate-500`} />
      {showLabel && <span>Unverified</span>}
    </div>
  );
}
