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
  member: MemberType|null;
  setMember: Dispatch<SetStateAction<any>>;

}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {

  const storedMember = localStorage.getItem('member');
  const initialMember = storedMember ? JSON.parse(storedMember) : null;
  const [member, setMember] = useState(initialMember);




  return (
    <AuthContext.Provider
      value={{setMember,member}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
