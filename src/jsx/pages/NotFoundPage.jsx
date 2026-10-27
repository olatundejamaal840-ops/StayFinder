/**
 * @file NotFoundPage.jsx
 * @description 404 page for unmatched routes.
 */

import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Building2 } from "lucide-react";
import { Button } from "../components/ui/Button.jsx";

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 mb-2">
        <Building2 className="w-8 h-8 text-blue-600" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 font-display">
        404
      </h1>
      <h2 className="text-lg font-bold text-slate-800">Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
        The verified listing, portal route, or resource you are looking for does not exist or has been relocated.
      </p>

      <div className="pt-4 flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" icon={Home} className="text-xs font-bold">
            Back to Home
          </Button>
        </Link>
        <Link to="/search">
          <Button variant="outline" icon={Search} className="text-xs font-bold">
            Search Homes
          </Button>
        </Link>
      </div>
    </div>
  );
}
