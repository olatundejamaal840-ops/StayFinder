/**
 * @file ContactPage.jsx
 * @description Support, verification inquiries, fraud reporting, and contact form.
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, ShieldAlert, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";
import { useToast } from "../../js/store/ToastContext.jsx";
import { validateEmail } from "../../js/utils/validators.js";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const { addToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    const emailErr = validateEmail(email);
    if (emailErr) {
      addToast(emailErr, "error");
      return;
    }
    if (!name.trim()) {
      addToast("Please provide your name.", "error");
      return;
    }
    if (!message.trim()) {
      addToast("Please enter a message.", "error");
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      addToast(
        "Message received! Our verified compliance support team will respond within 4 hours.",
        "success"
      );
      setName("");
      setEmail("");
      setMessage("");
    }, 600);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      {/* Top Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold mb-3 border border-blue-100">
          <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
          <span>We Are Here For You</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-display">
          Contact StayFinder Support
        </h1>
        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
          Need help scheduling a physical viewing, verifying a landlord's credentials,
          or reporting suspicious activity? Our dedicated support team is active 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="e.g. Tunde Balogun"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="tunde@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Inquiry Topic
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:outline-hidden"
              >
                <option value="general">General Marketplace Inquiry</option>
                <option value="verification">Landlord Verification Request</option>
                <option value="viewing">Viewing Appointment Assistance</option>
                <option value="fraud">Report Suspected Scam / Phantom Listing</option>
                <option value="partnership">Corporate Real Estate Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Message
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain your inquiry in detail. Include property reference IDs if applicable."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:outline-hidden"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              icon={Send}
              loading={sending}
              className="text-xs font-bold"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Info & Urgent Hotlines */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Platform Headquarters
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Lagos Office:</strong>
                  <span>Plot 12, Adeola Odeku Street, Victoria Island, Lagos</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Abuja Office:</strong>
                  <span>Constitution Avenue, Central Business District, Abuja FCT</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <Phone className="w-4 h-4 text-blue-800 shrink-0" />
                <span>+234 (0) 700 STAYFINDER</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-800 shrink-0" />
                <span>support@stayfinder.ng</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-800 shrink-0" />
                <span>Monday – Saturday: 8:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Rapid Fraud Alert Hotline */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-xs text-rose-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-800">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Emergency Scam Response Hotline</span>
            </div>
            <p className="leading-relaxed">
              If an individual purporting to be a StayFinder landlord asks for advance inspection fees,
              call our 24/7 anti-fraud dispatch immediately at <strong>+234 818 000 SCAM</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
