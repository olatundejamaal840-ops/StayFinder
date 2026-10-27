/**
 * @file App.jsx
 * @description Master application component configuring global store providers,
 * React Router DOM routes, layouts, and public/portal navigation for StayFinder.
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./js/store/AuthContext.jsx";
import { FavouritesProvider } from "./js/store/FavouritesContext.jsx";
import { ToastProvider } from "./js/store/ToastContext.jsx";
import { MainLayout } from "./jsx/layout/MainLayout.jsx";
import { HomePage } from "./jsx/pages/HomePage.jsx";
import { SearchPage } from "./jsx/pages/SearchPage.jsx";
import { PropertyDetailPage } from "./jsx/pages/PropertyDetailPage.jsx";
import { HowItWorksPage } from "./jsx/pages/HowItWorksPage.jsx";
import { ContactPage } from "./jsx/pages/ContactPage.jsx";
import { LoginPage } from "./jsx/pages/LoginPage.jsx";
import { AdminDashboardPage } from "./jsx/pages/AdminDashboardPage.jsx";
import { NotFoundPage } from "./jsx/pages/NotFoundPage.jsx";

export function App() {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Marketplace Layout Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="properties/:id" element={<PropertyDetailPage />} />
                <Route path="favourites" element={<Navigate to="/" replace />} />
                <Route path="how-it-works" element={<HowItWorksPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signin" element={<Navigate to="/login" replace />} />
                <Route path="signup" element={<LoginPage />} />
                <Route path="admin" element={<AdminDashboardPage />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </FavouritesProvider>
    </AuthProvider>
  );
}

export default App;
