import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface ProfileData {
  feet: number;
  inches: number;
  weight: number;
  bodyFat: number;
}

interface ProfileContextType {
  profile: ProfileData;
  setProfile: (data: ProfileData) => void;
}

const defaultProfile: ProfileData = {
  feet: 0,
  inches: 0,
  weight: 0,
  bodyFat: 0,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
  username: string;
}

export const ProfileProvider = ({ children, username }: ProfileProviderProps) => {
  const storageKey = `${username}:profile`;

  const [profile, setProfileState] = useState<ProfileData>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : defaultProfile;
  });

  const setProfile = (data: ProfileData) => {
    setProfileState(data);
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};