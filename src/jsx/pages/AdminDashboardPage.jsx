/**
 * @file AdminDashboardPage.jsx
 * @description Master Administrator Dashboard for monitoring Property Seekers and Landlords.
 * Provides full centralized oversight across all users, listings, inspections, and viewings
 * without requiring the Admin to log into individual user accounts.
 * Primary & secondary color palette: White, Black, and Blue only.
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Users,
  Building2,
  Home,
  CheckCircle2,
  Clock,
  Eye,
  Calendar,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  AlertCircle,
  FileText,
  BadgeCheck,
  RefreshCw,
  LogOut,
  ChevronRight,
  X
} from "lucide-react";
import { useAuth } from "../../js/store/AuthContext.jsx";
import { useToast } from "../../js/store/ToastContext.jsx";
import {
  getMonitoredSeekers,
  getMonitoredLandlords,
  getAdminPlatformMetrics,
  verifyPropertyInspection,
  getMonitoredViewingLogs
} from "../../js/services/adminService.js";
import { getStoredProperties } from "../../js/services/propertyService.js";
import { Button } from "../components/ui/Button.jsx";

export function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "seekers" | "landlords" | "properties" | "viewings"
  const [searchFilter, setSearchFilter] = useState("");
  const [seekers, setSeekers] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [propertiesList, setPropertiesList] = useState([]);
  const [viewingsList, setViewingsList] = useState([]);
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const [selectedLandlord, setSelectedLandlord] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  function refreshData() {
    const s = getMonitoredSeekers();
    const l = getMonitoredLandlords();
    const props = getStoredProperties();
    const views = getMonitoredViewingLogs();

    setSeekers(s);
    setLandlords(l);
    setPropertiesList(props);
    setViewingsList(views);
  }

  // Property inspection counts
  const verifiedPropsCount = propertiesList.filter((p) => p.verified).length;
  const pendingPropsCount = propertiesList.length - verifiedPropsCount;

  function handleVerifyProperty(propId) {
    const updated = verifyPropertyInspection(propId);
    setPropertiesList(updated);
    addToast("Property physical inspection verified successfully!", "success");
  }

  // Search filtering
  const filteredSeekers = seekers.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.state?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredLandlords = landlords.filter(
    (l) =>
      l.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      l.email?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      l.state?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredProperties = propertiesList.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.state?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.landlord?.name?.toLowerCase().includes(searchFilter.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 text-left">
      {/* 1. Master Admin Header Banner */}
      <div className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-500/40 text-blue-200 text-xs font-semibold mb-3">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Central Operations & Compliance Officer Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                Admin Oversight Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Logged in as <strong className="text-white">devcohort77@gmail.com</strong>.
                Monitoring all Property Seekers, Landlord portfolios, physical inspections, and scheduled tours in real time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  refreshData();
                  addToast("Dashboard data synchronized with latest platform state.", "info");
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sync Platform Data</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600/90 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-8 pt-6 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Active Seekers</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-display">
                {seekers.length}
              </div>
              <span className="text-[10px] text-blue-400 font-semibold">Registered Buyers & Tenants</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Verified Landlords</span>
                <Building2 className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-display">
                {landlords.length}
              </div>
              <span className="text-[10px] text-blue-400 font-semibold">Title Owners & Developers</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Total Properties</span>
                <Home className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-display">
                {propertiesList.length}
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Across Nigeria (Rent & Sale)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Physical Inspections</span>
                <BadgeCheck className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-display">
                {verifiedPropsCount}
              </div>
              <span className="text-[10px] text-blue-400 font-semibold">100% Certified Field Audits</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Viewing Inquiries</span>
                <Calendar className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-display">
                {viewingsList.length}
              </div>
              <span className="text-[10px] text-blue-400 font-semibold">Direct Tour Appointments</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Navigation Tabs & Search Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Segmented Control Tabs */}
          <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: ShieldCheck },
              { id: "seekers", label: `Seeker Dashboard (${seekers.length})`, icon: Users },
              { id: "landlords", label: `Landlord Dashboard (${landlords.length})`, icon: Building2 },
              { id: "properties", label: `Properties (${propertiesList.length})`, icon: Home },
              { id: "viewings", label: `Viewing Tours (${viewingsList.length})`, icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by name, email, or state..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW TAB */}
        {/* ============================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Quick Monitoring Cards */}
              <div className="lg:col-span-8 space-y-6">
                {/* Recent Seekers Summary */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <h3 className="text-base font-extrabold text-slate-900 font-display">
                        Property Seekers Under Monitoring
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("seekers")}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({seekers.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {seekers.slice(0, 4).map((seeker) => (
                      <div key={seeker.id || seeker.email} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase">
                            {seeker.name?.charAt(0) || "S"}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{seeker.name}</div>
                            <div className="text-[11px] text-slate-500">{seeker.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {seeker.state || "Lagos"}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedSeeker(seeker)}
                            className="px-2.5 py-1 text-[11px] font-bold text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                          >
                            Inspect Activity
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Landlords Summary */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <h3 className="text-base font-extrabold text-slate-900 font-display">
                        Landlords & Property Titles Under Oversight
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("landlords")}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({landlords.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {landlords.slice(0, 4).map((landlord) => (
                      <div key={landlord.id || landlord.email} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                            {landlord.name?.charAt(0) || "L"}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{landlord.name}</div>
                            <div className="text-[11px] text-slate-500">{landlord.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            C-of-O Verified
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedLandlord(landlord)}
                            className="px-2.5 py-1 text-[11px] font-bold text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                          >
                            Inspect Portfolio
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Platform Trust Rules & Compliance */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
                  <h4 className="text-sm font-extrabold text-slate-900 font-display mb-3">
                    Compliance & Security Guarantee
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    As Lead Admin (<strong className="text-slate-900">devcohort77@gmail.com</strong>), you hold master supervisory permissions. You can inspect all data directly without needing to log in to seeker or landlord accounts.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-blue-50 border border-blue-100">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-bold text-blue-950 block">Zero Phantom Fees Policy</span>
                        <span className="text-blue-900/80 text-[11px]">
                          Free physical viewings enforced. No unauthorized inspection levies.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <BadgeCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">Physical On-Site Verification</span>
                        <span className="text-slate-600 text-[11px]">
                          {verifiedPropsCount} of {propertiesList.length} properties verified by field agents with GPS geotags.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Link Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md">
                  <h4 className="text-sm font-bold font-display text-white mb-2">
                    Direct Marketplace Navigation
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Audit live public listings and search filters as seen by active users.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link to="/search?type=rent">
                      <Button variant="outline" size="sm" className="w-full justify-between text-xs font-bold border-slate-700 text-white hover:bg-slate-800">
                        <span>Inspect Rental Listings</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Link to="/search?type=sale">
                      <Button variant="outline" size="sm" className="w-full justify-between text-xs font-bold border-slate-700 text-white hover:bg-slate-800">
                        <span>Inspect Properties for Sale</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: SEEKER DASHBOARD MONITOR */}
        {/* ============================================================== */}
        {activeTab === "seekers" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-display">
                    Seeker Accounts Monitor
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Viewing all registered property seekers across Nigeria. Directly inspect their activity, saved homes, and tour requests.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {filteredSeekers.length} Active Seekers
                </span>
              </div>

              {filteredSeekers.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No seekers matching your search filter.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
                        <th className="py-3 px-4">Seeker Name</th>
                        <th className="py-3 px-4">Email Address</th>
                        <th className="py-3 px-4">Phone Number</th>
                        <th className="py-3 px-4">Primary State</th>
                        <th className="py-3 px-4">Account Type</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSeekers.map((seeker) => (
                        <tr key={seeker.id || seeker.email} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase">
                                {seeker.name?.charAt(0) || "S"}
                              </div>
                              <span>{seeker.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{seeker.email}</td>
                          <td className="py-3.5 px-4 text-slate-600">{seeker.phone || "+234 800 000 0000"}</td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                              {seeker.state || "Lagos"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 font-bold text-blue-600 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Verified Seeker</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedSeeker(seeker)}
                              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-colors cursor-pointer"
                            >
                              Inspect Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: LANDLORD DASHBOARD MONITOR */}
        {/* ============================================================== */}
        {activeTab === "landlords" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-display">
                    Landlord Portfolio & Title Oversight
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Centralized audit of all registered property owners, corporate developers, and verified title holders.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {filteredLandlords.length} Landlords
                </span>
              </div>

              {filteredLandlords.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No landlords matching your search filter.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
                        <th className="py-3 px-4">Landlord / Entity</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Primary Region</th>
                        <th className="py-3 px-4">Title Deed Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLandlords.map((landlord) => (
                        <tr key={landlord.id || landlord.email} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                                {landlord.name?.charAt(0) || "L"}
                              </div>
                              <span>{landlord.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{landlord.email}</td>
                          <td className="py-3.5 px-4 text-slate-600">{landlord.phone || "+234 803 000 0000"}</td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                              {landlord.state || "FCT / Lagos"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 font-bold text-blue-600 text-[11px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>C-of-O & KYC Approved</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedLandlord(landlord)}
                              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-colors cursor-pointer"
                            >
                              Inspect Portfolio
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: PROPERTIES & PHYSICAL INSPECTIONS AUDIT */}
        {/* ============================================================== */}
        {activeTab === "properties" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-display">
                    Marketplace Properties & Inspection Audit
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review and verify on-site inspection certificates, pricing compliance, and GPS coordinates for all Nigerian listings.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {verifiedPropsCount} Verified
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {pendingPropsCount} Pending Audit
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
                      <th className="py-3 px-4">Property Title</th>
                      <th className="py-3 px-4">State & Area</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Price (NGN)</th>
                      <th className="py-3 px-4">Inspection Status</th>
                      <th className="py-3 px-4 text-right">Admin Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                          <Link to={`/properties/${prop.id}`} className="hover:text-blue-600 transition-colors">
                            {prop.title}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {prop.area}, {prop.state}
                        </td>
                        <td className="py-3.5 px-4 capitalize font-semibold text-slate-700">
                          {prop.transactionType} ({prop.propertyType})
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          ₦{prop.price?.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          {prop.verified ? (
                            <span className="inline-flex items-center gap-1 font-bold text-blue-600 text-[11px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                              <BadgeCheck className="w-3.5 h-3.5" />
                              <span>100% On-Site Inspected</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-bold text-slate-500 text-[11px] bg-slate-100 px-2 py-0.5 rounded-md">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Pending Field Agent</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {!prop.verified ? (
                            <button
                              type="button"
                              onClick={() => handleVerifyProperty(prop.id)}
                              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                            >
                              Approve Badge
                            </button>
                          ) : (
                            <Link
                              to={`/properties/${prop.id}`}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors inline-block"
                            >
                              View Live Listing
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: VIEWING TOURS & ANTI-SCAM LOGS */}
        {/* ============================================================== */}
        {activeTab === "viewings" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-display">
                    Scheduled Physical Viewings & Scam Prevention
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time log of direct viewing tours scheduled between verified seekers and landlords. Zero phantom fees recorded.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {viewingsList.length} Total Bookings
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
                      <th className="py-3 px-4">Booking Ref</th>
                      <th className="py-3 px-4">Property</th>
                      <th className="py-3 px-4">Seeker</th>
                      <th className="py-3 px-4">Tour Date & Time</th>
                      <th className="py-3 px-4">Inspection Fee</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {viewingsList.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{req.id}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                          {req.propertyTitle}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{req.seekerName}</div>
                          <div className="text-[11px] text-slate-500">{req.seekerEmail}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          {req.requestedDate} at {req.requestedTime}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-blue-600 text-[11px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                            ₦0 (Free Policy)
                          </span>
                        </td>
                        <td className="py-3.5 px-4 capitalize">
                          <span className="font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px]">
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* MODAL / DRAWER: INSPECT INDIVIDUAL SEEKER ACTIVITY */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedSeeker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-left space-y-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base uppercase">
                    {selectedSeeker.name?.charAt(0) || "S"}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 font-display">
                      {selectedSeeker.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium">{selectedSeeker.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSeeker(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Phone Contact:</span>
                  <strong className="text-slate-900">{selectedSeeker.phone || "+234 800 000 0000"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Primary State:</span>
                  <strong className="text-slate-900">{selectedSeeker.state || "Lagos"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Account Role:</span>
                  <strong className="text-blue-600 uppercase font-bold">Property Seeker (Tenant / Buyer)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Inspection Bookings:</span>
                  <strong className="text-slate-900">
                    {viewingsList.filter((v) => v.seekerEmail === selectedSeeker.email).length} Tours Scheduled
                  </strong>
                </div>
              </div>

              <div className="text-center pt-2">
                <Button
                  variant="primary"
                  onClick={() => setSelectedSeeker(null)}
                  className="w-full justify-center text-xs font-bold"
                >
                  Close Oversight Inspector
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL / DRAWER: INSPECT INDIVIDUAL LANDLORD PORTFOLIO */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedLandlord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-left space-y-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-base uppercase">
                    {selectedLandlord.name?.charAt(0) || "L"}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 font-display">
                      {selectedLandlord.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium">{selectedLandlord.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLandlord(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Contact Phone:</span>
                  <strong className="text-slate-900">{selectedLandlord.phone || "+234 803 111 2233"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Headquarters / State:</span>
                  <strong className="text-slate-900">{selectedLandlord.state || "FCT / Lagos"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Title Deed Status:</span>
                  <strong className="text-blue-600 font-bold">Certificate of Occupancy (C of O) Audited</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Physical Inspection Rating:</span>
                  <strong className="text-slate-900">100% Certified Field Audit</strong>
                </div>
              </div>

              <div className="text-center pt-2">
                <Button
                  variant="primary"
                  onClick={() => setSelectedLandlord(null)}
                  className="w-full justify-center text-xs font-bold"
                >
                  Close Landlord Portfolio
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminDashboardPage;
