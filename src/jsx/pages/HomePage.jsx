/**
 * @file HomePage.jsx
 * @description Landing page featuring high-impact hero, interactive search widget,
 * verified marketplace guarantee, featured properties, neighborhood guides, and landlord CTA.
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  Building2,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  KeyRound,
  ChevronRight
} from "lucide-react";
import { getFeaturedProperties } from "../../js/services/propertyService.js";
import {
  NIGERIAN_STATES,
  getStateOptions,
  getPopularNigerianStates
} from "../../js/data/nigerianStates.js";
import { PropertyCard } from "../components/property/PropertyCard.jsx";
import { Button } from "../components/ui/Button.jsx";

export function HomePage() {
  const navigate = useNavigate();
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  // Hero search form state
  const [transactionType, setTransactionType] = useState("rent");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const popularStates = getPopularNigerianStates();

  useEffect(() => {
    async function load() {
      try {
        const res = await getFeaturedProperties();
        setFeaturedListings(res.slice(0, 6));
      } catch (err) {
        console.error("Failed to load featured properties", err);
      } finally {
        setLoadingFeatured(false);
      }
    }
    load();
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (transactionType && transactionType !== "all") {
      params.set("type", transactionType);
    }
    if (selectedState && selectedState !== "all") {
      params.set("state", selectedState);
    }
    if (selectedType && selectedType !== "all") {
      params.set("propertyType", selectedType);
    }
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    navigate(`/search?${params.toString()}`);
  }

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-145 lg:min-h-160 bg-slate-950 text-white flex items-center overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury home in Nigeria"
            className="w-full h-full object-cover opacity-25 scale-105 transform filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-br from-blue-950/30 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center md:text-left">
          <div className="max-w-3xl">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/90 border border-blue-600/60 text-blue-200 text-xs font-semibold mb-6 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-blue-300" />
              <span>Nigeria's First 100% Physically Verified Real Estate Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.12]"
            >
              Find verified homes. <br />
              <span className="text-blue-400">
                Zero scams. No phantom listings.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
            >
              Every property on StayFinder is vetted in person by our field inspectors.
              Direct landlord contact, verified title deeds, and zero predatory middleman fees.
            </motion.p>
          </div>

          {/* Interactive Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl text-slate-900 border border-slate-200/80 max-w-4xl"
          >
            {/* Rent / Buy Tabs */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setTransactionType("rent")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  transactionType === "rent"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Rent a Home
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("sale")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  transactionType === "sale"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Buy Property
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("all")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  transactionType === "all"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                All Listings
              </button>
            </div>

            {/* Input Grid */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Keyword / Area */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Location or Keyword
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Lekki, Ikoyi, Maitama"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Nigerian State Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  State / Region
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Nigeria (36 States + FCT)</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Terrace">Terrace</option>
                  <option value="Detached House">Detached House</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="flex items-end">
                <Button
                  type="submit"
                  variant="primary"
                  icon={Search}
                  className="w-full h-9.5 justify-center text-xs font-bold"
                >
                  Find Homes
                </Button>
              </div>
            </form>

            {/* Quick State Shortcut Pills */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Popular States:
              </span>
              {["Lagos", "FCT", "Rivers", "Oyo", "Enugu", "Kano", "Delta", "Ogun"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    setSelectedState(st);
                    navigate(`/search?state=${encodeURIComponent(st)}`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 font-semibold text-[11px] transition-colors cursor-pointer"
                >
                  {st === "FCT" ? "Abuja (FCT)" : st}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Platform Trust Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-center p-3 border-r border-slate-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">
              100%
            </div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">
              Physical Inspection Guarantee
            </div>
          </div>
          <div className="text-center p-3 border-r border-slate-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">
              0
            </div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">
              Unverified Phantom Listings
            </div>
          </div>
          <div className="text-center p-3 border-r border-slate-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">
              &lt; 24h
            </div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">
              Viewing Confirmation Speed
            </div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">
              ₦0
            </div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">
              Middleman Surcharge Fees
            </div>
          </div>
        </div>
      </section>

      {/* 3. The StayFinder Verification Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-3 border border-blue-100">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>The Trust Standard</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Why Renters & Buyers Choose StayFinder
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Real estate fraud is pervasive. StayFinder completely eliminates the risk
            through rigorous multi-step on-site validation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 border border-blue-100">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              1. Title Deed & Landlord KYC
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              We verify government ID, company registration (CAC), and ownership documentation
              (C of O, Governor's Consent, or Deed of Assignment) before any property goes live.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 border border-blue-100">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              2. On-Site Physical Inspection
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Our trained field agents visit each property in person. We test water, power,
              confirm photograph accuracy, and verify structural conditions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 border border-blue-100">
              <KeyRound className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              3. Direct Viewing Scheduling
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Book real-time physical viewings directly with the verified landlord.
              No fake booking fees, no non-existent apartments, no agent run-arounds.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Featured Verified Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold mb-2 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Featured Verified Properties
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Top-rated listings physically inspected and approved within the past 14 days.
            </p>
          </div>

          <Link to="/search">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" className="text-xs font-bold">
              View All Properties
            </Button>
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 5. Explore Nigeria's 36 States & Prime Regions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-2 border border-blue-100">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Pan-Nigeria Marketplace</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Explore Nigeria's 36 States & FCT
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Browse physically inspected and certified homes across key economic and residential hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularStates.map((state) => (
            <Link
              key={state.value}
              to={`/search?state=${encodeURIComponent(state.value)}`}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 block text-left"
            >
              <img
                src={state.image}
                alt={`${state.label}, Nigeria`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/45 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="bg-blue-900/90 text-blue-200 border border-blue-700/60 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {state.count}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                    Capital: {state.capital}
                  </span>
                  <h4 className="text-base font-bold text-white font-display">
                    {state.label}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {state.tagline}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Landlord & Owner Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden text-left">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>For Property Owners & Verified Landlords</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Own Property Anywhere in Nigeria?
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              List on StayFinder across all 36 states to reach verified seekers ready to sign and pay.
              Get your property physically certified and displayed to qualified, pre-screened clients.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/login?role=landlord&mode=signup">
                <Button variant="primary" icon={ArrowRight} iconPosition="right" className="font-bold text-xs">
                  Register as Landlord
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-white/10 font-bold text-xs">
                  Landlord Verification Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
