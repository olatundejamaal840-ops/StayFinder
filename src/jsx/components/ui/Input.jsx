/**
 * @file Input.jsx
 * @description Accessible text input component with label, error states, and icon support.
 */

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon = null,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isPassword = type === "password";
  const actualType = isPassword ? (showPassword ? "text" : "password") : type;

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={`w-full text-left ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full rounded-xl border bg-white text-slate-900 text-sm transition-colors duration-150 py-2.5 outline-none
            ${Icon ? "pl-10" : "pl-3.5"}
            ${isPassword ? "pr-10" : "pr-3.5"}
            ${
              error
                ? "border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-600"
                : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            }
            ${disabled ? "bg-slate-100 text-slate-400 cursor-not-allowed" : ""}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
