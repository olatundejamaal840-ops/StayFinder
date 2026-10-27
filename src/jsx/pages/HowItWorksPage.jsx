/**
 * @file HowItWorksPage.jsx
 * @description Educational trust & safety page explaining physical property auditing,
 * title verification, scam prevention guidelines, and FAQ.
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Eye,
  KeyRound,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Building2
} from "lucide-react";
import { Button } from "../components/ui/Button.jsx";
import { Reordering } from "../components/animation/Reordering.jsx";

export function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Landlord KYC & Legal Title Deed Audit",
      description:
        "Every property owner submits valid government identification (NIN, Driver's License, or International Passport) and authenticated legal title deeds (Certificate of Occupancy, Governor's Consent, or Deed of Assignment). Corporate developers provide verified CAC documents.",
      icon: FileCheck
    },
    {
      num: "02",
      title: "On-Site Physical Inspection by Field Agents",
      description:
        "StayFinder inspectors physically visit each location. We cross-examine photograph authenticity, verify room dimensions, inspect plumbing, electrical supply, and ensure the building is free from undisclosed structural defects.",
      icon: Eye
    },
    {
      num: "03",
      title: "Direct Owner Pricing Guarantee",
      description:
        "We verify the true rental or purchase price directly with the legitimate title holder. This prevents predatory agents from adding inflated unauthorized markups or fictitious agency fees.",
      icon: ShieldCheck
    },
    {
      num: "04",
      title: "Verified Badge Issuance & Viewing Scheduling",
      description:
        "Only properties that pass 100% of our compliance checks earn the StayFinder Verified Badge. Seekers can book direct viewings with full peace of mind and zero advance inspection fees.",
      icon: KeyRound
    }
  ];

  const safetyRules = [
    {
      title: "Never Pay Upfront 'Inspection' or 'Registration' Fees",
      desc: "StayFinder viewing appointments are completely free. If any person asks you to send money before you see the physical house, report them immediately."
    },
    {
      title: "Confirm In-Person Key Turnover and Tenancy Agreement",
      desc: "Always review and sign a legitimate tenancy contract or deed of sale that clearly names the verified owner before disbursing closing payments."
    },
    {
      title: "Compare Official Bank Account Names",
      desc: "Ensure tenancy or purchase funds are paid into bank accounts matching the verified landlord name or legal corporate entity recorded on StayFinder."
    }
  ];

  const faqs = [
    {
      q: "How does StayFinder verify a landlord?",
      a: "Our legal verification team verifies identity via government databases and confirms property ownership by cross-checking land registry records, Deeds of Assignment, and Certificates of Occupancy."
    },
    {
      q: "Are physical viewings really free?",
      a: "Yes. StayFinder strictly forbids phantom inspection fees. You can schedule physical visits directly through the platform at zero extra cost."
    },
    {
      q: "What should I do if I suspect a fraudulent listing?",
      a: "Every listing page and dashboard features a rapid 'Report Fraud' button. Our Trust & Safety team investigates all reports within 2 business hours."
    },
    {
      q: "How can I list my own property as a landlord?",
      a: "Create an account, switch to Landlord mode, submit your property details along with proof of ownership, and our local field agent will contact you to schedule an on-site audit."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Header with Reordering Animation Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-4 border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>The StayFinder Verification Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            How StayFinder Protects You From Real Estate Scams
          </h1>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-xl">
            In Nigeria's real estate market, phantom listings and impersonation scams cost seekers
            millions every year. Here is our continuous 4-phase audit ensuring every home
            on StayFinder is authentic, surveyed, and directly connected to verified titleholders.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Dynamic 4-Stage Auditing Active
            </span>
          </div>
        </div>

        {/* Animation Display Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50/80 rounded-2xl border border-slate-200/60 shadow-inner">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 text-center">
            Verification Engine Matrix
          </p>
          <div className="flex items-center justify-center p-2">
            <Reordering />
          </div>
          <p className="text-[11px] text-slate-500 font-medium text-center mt-3">
            KYC • Physical Audit • Title Deed • Direct Landlord
          </p>
        </div>
      </div>

      {/* 4 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-black text-slate-200 font-display">
                  {step.num}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {step.title}
              </h3>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Safety Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-sm font-display">
          <AlertTriangle className="w-5 h-5 text-blue-700" />
          <span>Essential Tenant & Buyer Safety Guidelines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safetyRules.map((rule, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-blue-100 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 mb-2">
                {rule.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2"
            >
              <h4 className="text-sm font-bold text-slate-900 font-display">
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-bold font-display">
            Ready to experience scam-free property search?
          </h3>
          <p className="text-xs text-slate-300">
            Browse hundreds of physically certified properties in Lagos and Abuja.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/search">
            <Button variant="primary" icon={ArrowRight} iconPosition="right" className="font-bold text-xs">
              Browse Listings
            </Button>
          </Link>
          <Link to="/login?role=landlord">
            <Button variant="outline" className="border-slate-700 text-white hover:bg-white/10 font-bold text-xs">
              List as Landlord
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
