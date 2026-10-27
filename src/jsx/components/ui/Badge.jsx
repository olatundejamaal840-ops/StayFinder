/**
 * @file Badge.jsx
 * @description Status, category, and verification badges for properties and users.
 */

import React from "react";
import { CheckCircle2, Clock, XCircle, ShieldCheck } from "lucide-react";

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  icon = null,
  className = "",
}) {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1 font-medium",
    md: "text-xs px-2.5 py-1 gap-1.5 font-semibold",
  };

  const variantStyles = {
    verified:
      "bg-blue-50 text-blue-800 border border-blue-200",
    pending:
      "bg-slate-100 text-slate-800 border border-slate-200",
    rejected:
      "bg-red-50 text-red-700 border border-red-200",
    rent:
      "bg-blue-600 text-white font-medium uppercase tracking-wider",
    sale:
      "bg-slate-900 text-white font-medium uppercase tracking-wider",
    neutral:
      "bg-slate-100 text-slate-700 border border-slate-200",
    blue:
      "bg-blue-50 text-blue-800 border border-blue-200",
  };

  const defaultIcons = {
    verified: <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />,
    pending: <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />,
    rejected: <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />,
  };

  const activeIcon = icon !== undefined ? icon : defaultIcons[variant] || null;

  return (
    <span
      className={`inline-flex items-center rounded-lg transition-colors duration-150 select-none ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.neutral} ${className}`}
    >
      {activeIcon}
      <span>{children}</span>
    </span>
  );
}
