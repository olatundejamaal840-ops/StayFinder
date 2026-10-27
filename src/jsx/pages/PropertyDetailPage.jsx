/**
 * @file PropertyDetailPage.jsx
 * @description Comprehensive detail view for a single property, featuring photo gallery,
 * verification audit report, landlord credentials, and direct viewing scheduling modal.
 */

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Share2,
  ArrowLeft,
  Check,
  UserCheck,
  Building,
  KeyRound
} from "lucide-react";
import { getPropertyById, getProperties } from "../../js/services/propertyService.js";
import { scheduleViewing } from "../../js/services/viewingService.js";
import { useFavourites } from "../../js/store/FavouritesContext.jsx";
import { useToast } from "../../js/store/ToastContext.jsx";
import { useAuth } from "../../js/store/AuthContext.jsx";
import { formatCurrency, formatArea } from "../../js/utils/formatters.js";
import { PropertyGallery } from "../components/property/PropertyGallery.jsx";
import { VerificationBadge } from "../components/property/VerificationBadge.jsx";
import { PropertyCard } from "../components/property/PropertyCard.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Modal } from "../components/ui/Modal.jsx";
import { Input } from "../components/ui/Input.jsx";

export function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProperties, setSimilarProperties] = useState([]);

  // Viewing booking modal state
  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  const [viewingDate, setViewingDate] = useState("");
  const [viewingTime, setViewingTime] = useState("11:00 AM");
  const [viewingPhone, setViewingPhone] = useState("");
  const [viewingNotes, setViewingNotes] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const { isSaved, toggleSaved } = useFavourites();
  const { addToast } = useToast();
  const { user } = useAuth();

  // Route Guard: Unauthenticated users selecting a house to rent or buy are redirected to Property Seeker Login
  useEffect(() => {
    if (!loading && !user) {
      addToast(
        "Please sign in as a Property Seeker to continue renting or buying this verified property.",
        "info"
      );
      navigate(
        `/login?role=seeker&returnTo=${encodeURIComponent(
          `/properties/${id}`
        )}`,
        { replace: true }
      );
    }
  }, [user, loading, navigate, id, addToast]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const found = await getPropertyById(id);
        setProperty(found);

        if (found) {
          // Load similar properties
          const related = await getProperties({
            state: found.location.state,
            city: found.location.city,
            transactionType: found.transactionType,
          });
          setSimilarProperties(related.filter((p) => p.id !== found.id).slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load property details", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-500 font-medium">Loading verified property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Property Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">
          The requested listing may have expired or been removed from the verified registry.
        </p>
        <Link to="/search">
          <Button variant="primary">Browse Available Properties</Button>
        </Link>
      </div>
    );
  }

  const saved = isSaved(property.id);

  function handleSaveToggle() {
    const isNowSaved = toggleSaved(property.id);
    addToast(
      isNowSaved
        ? `Added to your saved properties!`
        : `Removed from saved properties.`,
      isNowSaved ? "success" : "info"
    );
  }

  function handleShare() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast("Property link copied to clipboard!", "success");
    }
  }

  async function handleScheduleViewing(e) {
    e.preventDefault();
    if (!viewingDate) {
      addToast("Please select an appointment date.", "error");
      return;
    }

    setBookingLoading(true);
    try {
      await scheduleViewing({
        propertyId: property.id,
        propertyTitle: property.title,
        seekerId: user?.id || "guest-seeker",
        seekerName: user?.name || "Interested Renter",
        seekerEmail: user?.email || "seeker@example.com",
        seekerPhone: viewingPhone || "+234 800 000 0000",
        requestedDate: viewingDate,
        requestedTime: viewingTime,
        notes: viewingNotes,
      });

      addToast(
        "Viewing appointment requested! The verified landlord will confirm within 24 hours.",
        "success"
      );
      setIsViewingModalOpen(false);
      setViewingNotes("");
    } catch (err) {
      addToast("Failed to book viewing. Please try again.", "error");
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Search</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Share property"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSaveToggle}
            className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              saved
                ? "border-blue-200 bg-blue-50 text-blue-900"
                : "border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? "fill-blue-600 text-blue-600" : ""}`} />
            <span>{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Title & Price Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <VerificationBadge status={property.verificationStatus} />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              For {property.transactionType}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
              {property.propertyType}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              {property.location.approximateAddress || `${property.location.area}, ${property.location.city}`}
            </span>
          </div>
        </div>

        <div className="text-left md:text-right">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {formatCurrency(property.price, property.currency)}
            {property.rentPeriod && (
              <span className="text-xs font-normal text-slate-500">
                {" "}
                / {property.rentPeriod}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400">Direct Landlord Price (No Agency Markup)</span>
        </div>
      </div>

      {/* Image Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Main Grid: Details Column + Landlord Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Specs, Description, Verification Audit, Amenities */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <div className="p-2 border-r border-slate-100 last:border-r-0">
              <Bed className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-900">
                {property.bedrooms} Bedrooms
              </div>
              <div className="text-[10px] text-slate-400">En-suite</div>
            </div>
            <div className="p-2 border-r border-slate-100 last:border-r-0">
              <Bath className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-900">
                {property.bathrooms} Bathrooms
              </div>
              <div className="text-[10px] text-slate-400">Full baths</div>
            </div>
            <div className="p-2 border-r border-slate-100 last:border-r-0">
              <Maximize2 className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-900">
                {formatArea(property.size, property.sizeUnit)}
              </div>
              <div className="text-[10px] text-slate-400">Floor space</div>
            </div>
            <div className="p-2">
              <Building className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-900">
                {property.isFurnished ? "Furnished" : "Unfurnished"}
              </div>
              <div className="text-[10px] text-slate-400">Interior status</div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <h3 className="text-base font-bold text-slate-900 font-display">
              About This Property
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* The StayFinder Verification Certificate Report */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Official StayFinder Verification Audit
                </h4>
                <p className="text-[11px] text-blue-300">
                  Inspected & authenticated by StayFinder Field Compliance Unit
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Title Deed Verified (Certificate of Occupancy / Deed)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Landlord Government Identity Authenticated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Physical Site Visit Conducted (No Phantom Property)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Price & Availability Confirmed with Owner</span>
              </div>
            </div>
          </div>

          {/* Amenities & Features */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Features & Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Verified Landlord & Viewing Booking Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md sticky top-24 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                Verified Landlord Profile
              </span>
            </div>

            {/* Landlord Identity */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <img
                src={property.landlord?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={property.landlord?.name || "Landlord"}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {property.landlord?.name || "Verified Landlord"}
                  </h4>
                  <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                </div>
                <p className="text-[10px] text-slate-500">
                  {property.landlord?.responseTime || "Quick respondent"}
                </p>
                <div className="text-[10px] font-semibold text-blue-700 mt-0.5">
                  Verified since {property.landlord?.verificationDate || "2024"}
                </div>
              </div>
            </div>

            {/* Rent / Buy Action & Schedule Viewing CTA */}
            <div className="space-y-2.5">
              <Button
                variant="primary"
                icon={KeyRound}
                onClick={() => {
                  if (!user) {
                    navigate(
                      `/login?role=seeker&returnTo=${encodeURIComponent(
                        `/properties/${property.id}`
                      )}`
                    );
                  } else {
                    setIsViewingModalOpen(true);
                  }
                }}
                className="w-full justify-center text-xs font-bold py-3 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                {property.transactionType === "rent"
                  ? "Apply to Rent This Property"
                  : "Make Purchase Offer"}
              </Button>

              <Button
                variant="outline"
                icon={Calendar}
                onClick={() => {
                  if (!user) {
                    navigate(
                      `/login?role=seeker&returnTo=${encodeURIComponent(
                        `/properties/${property.id}`
                      )}`
                    );
                  } else {
                    setIsViewingModalOpen(true);
                  }
                }}
                className="w-full justify-center text-xs font-bold py-3 border-slate-300 hover:bg-slate-50"
              >
                Schedule Physical Viewing
              </Button>

              <a
                href={`tel:${property.landlord?.phone || "+2348000000000"}`}
                className="block"
              >
                <Button
                  variant="outline"
                  icon={Phone}
                  className="w-full justify-center text-xs font-bold py-3 border-blue-700 text-blue-700 hover:bg-blue-50"
                >
                  Call Landlord Direct
                </Button>
              </a>
            </div>

            {/* Safe Viewing Tip */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>StayFinder Viewing Safety</span>
              </div>
              <p className="leading-relaxed">
                Never pay inspection or booking fees to any individual. Official viewings through
                StayFinder are completely free.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 font-display">
            Similar Verified Properties in {property.location.city}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}

      {/* Schedule Viewing Modal */}
      <Modal
        isOpen={isViewingModalOpen}
        onClose={() => setIsViewingModalOpen(false)}
        title="Schedule a Free Physical Viewing"
      >
        <form onSubmit={handleScheduleViewing} className="space-y-4 text-left">
          <p className="text-xs text-slate-500">
            Select your preferred inspection date and time. The verified landlord will be notified
            instantly to confirm your appointment.
          </p>

          <Input
            label="Preferred Date"
            type="date"
            value={viewingDate}
            onChange={(e) => setViewingDate(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Preferred Time Slot
            </label>
            <select
              value={viewingTime}
              onChange={(e) => setViewingTime(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:outline-hidden"
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
            </select>
          </div>

          <Input
            label="Phone Number (for SMS & WhatsApp Confirmation)"
            type="tel"
            placeholder="+234 800 000 0000"
            value={viewingPhone}
            onChange={(e) => setViewingPhone(e.target.value)}
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Special Notes / Questions (Optional)
            </label>
            <textarea
              rows={3}
              value={viewingNotes}
              onChange={(e) => setViewingNotes(e.target.value)}
              placeholder="e.g. Any inquiries about service charge or parking slots"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsViewingModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={bookingLoading}
            >
              Confirm Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
