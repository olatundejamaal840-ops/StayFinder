/**
 * @file Footer.jsx
 * @description Master page footer featuring platform mission, verified marketplace guarantees,
 * city shortcuts, trust guidelines, and working newsletter interaction.
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  ShieldCheck,
  CheckCircle,
  Mail,
  ArrowRight,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "../components/ui/Button.jsx";
import { useToast } from "../../js/store/ToastContext.jsx";
import { validateEmail } from "../../js/utils/validators.js";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { addToast } = useToast();

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const error = validateEmail(newsletterEmail);
    if (error) {
      addToast(error, "error");
      return;
    }
    addToast(
      "Thank you! You have subscribed to verified property alerts.",
      "success"
    );
    setNewsletterEmail("");
  }

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Guarantees Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-900">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/60">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">
                100% Verified Landlords
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Every landlord undergoes identity verification and title deed confirmation before listing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/60">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">
                Zero Phantom Listings
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                StayFinder field agents conduct physical on-site checks for photo and pricing accuracy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/60">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">
                Direct Viewing Scheduling
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Book physical viewings directly with property owners without predatory middleman markups.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                Stay<span className="text-blue-400">Finder</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              StayFinder is Nigeria's premier verified real estate marketplace. We
              make renting and purchasing homes transparent, secure, and hassle-free
              for seekers and legitimate property owners.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Headquarters: Victoria Island, Lagos, Nigeria</span>
            </div>
          </div>

          {/* Quick Discover */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore 36 States
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/search?type=rent" className="hover:text-blue-400 transition-colors">
                  Homes for Rent
                </Link>
              </li>
              <li>
                <Link to="/search?type=sale" className="hover:text-blue-400 transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/search?city=Lagos" className="hover:text-blue-400 transition-colors">
                  Lagos Listings
                </Link>
              </li>
              <li>
                <Link to="/search?city=Abuja" className="hover:text-blue-400 transition-colors">
                  Abuja (FCT) Listings
                </Link>
              </li>
              <li>
                <Link to="/search?state=Rivers" className="hover:text-blue-400 transition-colors">
                  Rivers (Port Harcourt)
                </Link>
              </li>
              <li>
                <Link to="/search?state=Oyo" className="hover:text-blue-400 transition-colors">
                  Oyo (Ibadan)
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Safety + Portal Access */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Trust & Accounts
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Sign In (All Roles)
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-blue-400 transition-colors">
                  Verification Process
                </Link>
              </li>
              <li>
                <Link to="/how-it-works#landlord-guide" className="hover:text-blue-400 transition-colors">
                  Landlord Requirements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Report Suspicious Listing
                </Link>
              </li>
              <li>
                <Link to="/login?role=landlord" className="hover:text-blue-400 transition-colors">
                  Landlord Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Get Verified Alerts
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive curated new listings matching prime neighborhood criteria.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-3 pr-9 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 p-1.5 rounded-lg cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StayFinder Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/how-it-works" className="hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link to="/how-it-works" className="hover:text-slate-400">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-slate-400">
              Security Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
