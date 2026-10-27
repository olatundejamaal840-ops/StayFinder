/**
 * @file Select.jsx
 * @description Accessible custom select component with icon and validation states.
 */

import React from "react";
import { ChevronDown } from "lucide-react";

export function Select({
  label,
  id,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full text-left ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full appearance-none rounded-xl border bg-white text-slate-900 text-sm py-2.5 pl-3.5 pr-10 outline-none transition-colors duration-150 cursor-pointer
            ${
              error
                ? "border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-600"
                : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            }
            ${disabled ? "bg-slate-100 text-slate-400 cursor-not-allowed" : ""}
          `}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const text = typeof opt === "object" ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
