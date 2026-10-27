/**
 * @file LoginPage.jsx
 * @description Authentication page for General, Property Seeker, and Landlord roles,
 * styled to match the modern minimal card layout with rich real estate background image.
 */

import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  User,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../../js/store/AuthContext.jsx";
import { useToast } from "../../js/store/ToastContext.jsx";
import { NIGERIAN_STATES } from "../../js/data/nigerianStates.js";
import { validateEmail, validatePassword } from "../../js/utils/validators.js";

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, login, signup } = useAuth();
  const { addToast } = useToast();

  const defaultMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [authMode, setAuthMode] = useState(defaultMode);

  const initialRole = searchParams.get("role") || "seeker";
  const [selectedRole, setSelectedRole] = useState(
    ["seeker", "landlord", "admin"].includes(initialRole) ? initialRole : "seeker"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedState, setSelectedState] = useState("Lagos");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const returnUrl = searchParams.get("returnTo");


  async function handleSubmit(e) {
    e.preventDefault();
    const emailErr = validateEmail(email);
    if (emailErr) {
      addToast(emailErr, "error");
      return;
    }

    if (authMode === "login") {
      if (!password) {
        addToast("Please enter your password.", "error");
        return;
      }
      setLoading(true);
      try {
        const res = await login(email, password, selectedRole);
        if (res.success && res.user) {
          addToast(`Welcome back, ${res.user.name}!`, "success");
          if (res.user.role === "admin" || res.user.email === "devcohort77@gmail.com") {
            navigate("/admin");
          } else {
            navigate(returnUrl || (res.user.role === "landlord" ? "/login?role=landlord" : "/search?type=rent"));
          }
        } else {
          addToast(res.error || "Authentication failed. Please check credentials.", "error");
        }
      } catch (err) {
        addToast(err.message || "An unexpected sign in error occurred.", "error");
      } finally {
        setLoading(false);
      }
    } else {
      if (!name.trim()) {
        addToast("Please enter your full name.", "error");
        return;
      }
      const passErr = validatePassword(password);
      if (passErr) {
        addToast(passErr, "error");
        return;
      }
      setLoading(true);
      try {
        const res = await signup({
          name,
          email,
          password,
          role: selectedRole,
          phone,
          state: selectedState
        });
        if (res.success && res.user) {
          addToast(`Account created successfully for ${res.user.name}!`, "success");
          if (res.user.role === "admin" || res.user.email === "devcohort77@gmail.com") {
            navigate("/admin");
          } else {
            navigate(returnUrl || (res.user.role === "landlord" ? "/login?role=landlord" : "/search?type=rent"));
          }
        } else {
          addToast(res.error || "Failed to register account.", "error");
        }
      } catch (err) {
        addToast(err.message || "Registration failed.", "error");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 1. Full Real Estate Hero Background Image with Atmospheric Tint */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Architecture StayFinder Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-slate-950/30" />
      </div>

      {/* 2. Modern Centered Authentication Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 sm:p-10 border border-white/60 my-6 text-left">

        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:bg-blue-700 transition-colors">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-950 font-display">
              Stay<span className="text-blue-600">Finder</span>
            </span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            {authMode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {authMode === "login"
              ? selectedRole === "landlord"
                ? "Sign in to manage and list your properties."
                : "Sign in to your account to continue."
              : "Register to explore or list verified Nigerian homes."}
          </p>
        </div>

        {/* Role Selector Segmented Controls (Seeker & Landlord) */}
        <div className="flex p-1 bg-slate-100/90 rounded-2xl mb-6 border border-slate-200/60">
          <button
            type="button"
            onClick={() => setSelectedRole("seeker")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${selectedRole === "seeker"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
              }`}
          >
            <User className={`w-3.5 h-3.5 ${selectedRole === "seeker" ? "text-blue-600" : "text-slate-400"}`} />
            <span>Seeker</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("landlord")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${selectedRole === "landlord"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
              }`}
          >
            <Building2 className={`w-3.5 h-3.5 ${selectedRole === "landlord" ? "text-blue-600" : "text-slate-400"}`} />
            <span>Landlord</span>
          </button>
        </div>

        {/* Email & Password Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {authMode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {/* Full Name Field */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. Babatunde Fashola"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Phone & State Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      PHONE NUMBER
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="+234 802 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      STATE
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full pl-9 pr-3 py-3 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                      >
                        {NIGERIAN_STATES.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* EMAIL Input */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              EMAIL
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="auth-email-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* PASSWORD Input with Forgot Password link */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                PASSWORD
              </label>
              {authMode === "login" && (
                <button
                  type="button"
                  onClick={() => addToast("Password reset instructions will be sent to your email.", "info")}
                  className="text-[11px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  FORGOT PASSWORD?
                </button>
              )}
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Large Vibrant Blue Pill Button matching reference */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : authMode === "login" ? (
                "SIGN IN"
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>
          </div>
        </form>

        {/* Footer Toggle: DON'T HAVE AN ACCOUNT? CREATE ONE */}
        <div className="text-center mt-8 pt-4 border-t border-slate-100">
          {authMode === "login" ? (
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              DON'T HAVE AN ACCOUNT?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className="font-extrabold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                CREATE ONE
              </button>
            </p>
          ) : (
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ALREADY HAVE AN ACCOUNT?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="font-extrabold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                SIGN IN
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
