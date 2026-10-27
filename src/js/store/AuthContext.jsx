/**
 * @file AuthContext.jsx
 * @description Provides authentication state, active user profile,
 * and role management throughout the application.
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  login as authLogin,
  logout as authLogout,
  signup as authSignup,
  switchRole as authSwitchRole,
  loginWithGoogle as authLoginWithGoogle
} from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(false);

  async function handleLogin(email, password, role) {
    setLoading(true);
    try {
      const loggedUser = await authLogin(email, password, role);
      setUser(loggedUser);
      return { success: true, user: loggedUser };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(data) {
    setLoading(true);
    try {
      const newUser = await authSignup(data);
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin(targetRole, customEmail = "") {
    setLoading(true);
    try {
      const res = await authLoginWithGoogle(targetRole, customEmail);
      if (res.success && res.user) {
        setUser(res.user);
      }
      return res;
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await authLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSwitchRole(role) {
    const switched = authSwitchRole(role);
    setUser(switched);
    return switched;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "guest",
        isAuthenticated: Boolean(user),
        loading,
        login: handleLogin,
        signup: handleSignup,
        loginWithGoogle: handleGoogleLogin,
        logout: handleLogout,
        switchRole: handleSwitchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
