"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { clearToken, getToken, saveToken } from "@/utils/auth";

import { getProfile } from "@/services/user.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setUser(data.user || data.data || data);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getToken()) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (token) => {
    saveToken(token);
    setLoading(true);

    await loadProfile();
  };

  const signOut = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        signIn,
        signOut,
        refreshProfile: loadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

