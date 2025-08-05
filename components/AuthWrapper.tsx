"use client";

import { AuthProvider } from "@/context/authContext";
import { ReactNode } from "react";
const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthWrapper;
