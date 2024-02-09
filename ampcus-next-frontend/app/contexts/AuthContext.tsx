'use client'

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import decryptData from "../utils/encryptdycrpt";
import { MemberType } from "../models/models";


interface AuthContextProps {
  user: string|null;
  member: MemberType|null;
  accessToken: string|null;
  refreshToken: string|null;
  setMember: Dispatch<SetStateAction<any>>;
  setRefreshToken: Dispatch<SetStateAction<any>>;
  logout: () => void;
  setUser: Dispatch<SetStateAction<any>>;
  setAccessToken: Dispatch<SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {


  const access = typeof window !== "undefined" ? window.localStorage.getItem('member') 



  const [member,setMember]=useState(JSON.parse(access))





  return (
    <AuthContext.Provider
      value={{setMember,member}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
