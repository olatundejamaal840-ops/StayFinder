/**
 * @file Button.jsx
 * @description Accessible, stateful button with motion feedback and design token styling.
 */

import React from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconRight: IconRight = null,
  className = "",
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
    md: "text-sm px-4 py-2.5 gap-2 h-11",
    lg: "text-base px-6 py-3.5 gap-2.5 h-13 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-blue-600 shadow-sm hover:shadow",
    secondary:
      "bg-slate-900 text-white hover:bg-black active:bg-slate-950 focus-visible:outline-slate-900",
    outline:
      "border border-slate-300 text-slate-800 hover:bg-blue-50/50 hover:text-blue-600 hover:border-blue-400 active:bg-blue-50 focus-visible:outline-blue-600",
    blue:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm focus-visible:outline-blue-600",
    ghost:
      "text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-slate-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:outline-red-600 shadow-sm",
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      whileHover={isDisabled ? {} : { scale: 1.015 }}
      whileTap={isDisabled ? {} : { scale: 0.985 }}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}

      <span>{children}</span>

      {!isLoading && IconRight ? (
        <IconRight className="w-4 h-4 shrink-0" />
      ) : null}
    </motion.button>
  );
}
