/**
 * @file Header.jsx
 * @description Master navigation header with logo, main links, live saved counter,
 * role testing switch, mobile drawer, and prominent "List Your Property" action.
 */

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  Heart,
  Menu,
  X,
  PlusCircle,
  User,
  ShieldCheck,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../../js/store/AuthContext.jsx";
import { useFavourites } from "../../js/store/FavouritesContext.jsx";
import { Button } from "../components/ui/Button.jsx";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const { savedCount } = useFavourites();

  const isActive = (path) => location.pathname === path;

  function handleLogout() {
    logout();
    setUserDropdownOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-extrabold tracking-tight text-black font-display">
                Stay<span className="text-blue-600">Finder</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 -mt-1">
                Nigeria Verified
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/search?type=rent"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.search.includes("type=rent")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-black hover:bg-slate-100"
              }`}
            >
              Rent
            </Link>
            <Link
              to="/search?type=sale"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.search.includes("type=sale")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-black hover:bg-slate-100"
              }`}
            >
              Buy
            </Link>
            <Link
              to="/login?role=seeker"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === "/login" && location.search.includes("role=seeker")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-black hover:bg-slate-100"
              }`}
            >
              Property Seeker
            </Link>
            <Link
              to="/login?role=landlord"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === "/login" && location.search.includes("role=landlord")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-black hover:bg-slate-100"
              }`}
            >
              Landlord
            </Link>
            <Link
              to="/how-it-works"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isActive("/how-it-works")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-black hover:bg-slate-100"
              }`}
            >
              How It Works
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isActive("/contact")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-black hover:bg-slate-100"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right Actions: Sign In, List Property CTA, User */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {/* Direct Sign In Link (when unauthenticated) */}
            {!user && (
              <Link
                to="/login"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  isActive("/login")
                    ? "text-blue-900 bg-blue-50"
                    : "text-slate-700 hover:text-blue-900 hover:bg-slate-50"
                }`}
              >
                Sign In
              </Link>
            )}

            {/* Admin Dashboard Button (when signed in as Admin) */}
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button
                  variant="primary"
                  size="sm"
                  icon={ShieldCheck}
                  className="font-bold text-xs bg-blue-600 hover:bg-blue-700"
                >
                  Admin Dashboard
                </Button>
              </Link>
            )}

            {/* List Your Property CTA Button */}
            {user?.role !== "admin" && (
              <Link to="/login?role=landlord">
                <Button
                  variant="outline"
                  size="sm"
                  icon={PlusCircle}
                  className="font-semibold border-blue-800 text-blue-900 hover:bg-blue-50 text-xs"
                >
                  List Property
                </Button>
              </Link>
            )}

            {/* User Account Menu (Only when signed in) */}
            {user && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
                  aria-label="User account menu"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.name ? user.name.charAt(0) : "U"}
                  </div>
                  <div className="text-left hidden lg:block pr-1">
                    <div className="text-xs font-bold text-slate-900 truncate max-w-28">
                      {user.name}
                    </div>
                    <div className="text-[10px] uppercase font-semibold text-blue-600">
                      {user.role === "landlord" ? "Landlord" : user.role === "admin" ? "Admin" : "Seeker"}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-left"
                    >
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-blue-600 font-medium truncate">
                          {user.email || "No email"}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                          <ShieldCheck className="w-3 h-3 text-blue-600" />
                          <span>
                            {user.role === "landlord"
                              ? "Verified Landlord"
                              : user.role === "admin"
                              ? "Compliance Officer"
                              : "Property Seeker"}
                          </span>
                        </span>
                      </div>

                      <div className="pt-2 space-y-1">
                        {user.role === "admin" && (
                          <Link
                            to="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Go to Admin Dashboard</span>
                          </Link>
                        )}
                        <Link
                          to="/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                        >
                          Switch Account / Portal
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 text-left"
          >
            <div className="space-y-1">
              <Link
                to="/search?type=rent"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Find Homes to Rent
              </Link>
              <Link
                to="/search?type=sale"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Find Homes to Buy
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-blue-600 bg-blue-50"
                >
                  Admin Oversight Dashboard
                </Link>
              )}
              <Link
                to="/login?role=seeker"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-semibold text-blue-700 hover:bg-blue-50"
              >
                Property Seeker Portal
              </Link>
              <Link
                to="/login?role=landlord"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-semibold text-blue-700 hover:bg-blue-50"
              >
                Landlord Portal
              </Link>
              <Link
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                How Verification Works
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Contact & Support
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <Link
                to="/login?role=seeker"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="outline" size="md" className="w-full font-bold">
                  Property Seeker Sign-In
                </Button>
              </Link>
              <Link
                to="/login?role=landlord"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="primary" size="md" className="w-full font-bold">
                  Landlord Sign-In / List Property
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
