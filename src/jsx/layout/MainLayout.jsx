/**
 * @file MainLayout.jsx
 * @description Master layout wrapper for all public and marketplace pages.
 */

import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { ToastContainer } from "../components/ui/Toast.jsx";

export function MainLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Remove footer on: rent (/search), buy (/search), property seeker (/login),
  // landlord (/login), how it works (/how-it-works), contact (/contact),
  // sign in (/login, /signin, /signup), and list property (/login)
  const noFooterRoutes = [
    "/search",
    "/how-it-works",
    "/contact",
    "/login",
    "/signin",
    "/signup",
    "/admin",
    "/dashboard"
  ];

  const shouldHideFooter = noFooterRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}
