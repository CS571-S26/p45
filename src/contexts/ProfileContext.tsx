import { createContext, useContext, useState} from "react";
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

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<ProfileData>(() => {
    const username = localStorage.getItem("username");
    if (!username) {
        return defaultProfile;
    }
    const stored = localStorage.getItem(JSON.parse(username));
    return stored ? JSON.parse(stored) : defaultProfile;
  });

  const setProfile = (data: ProfileData) => {
    const username = localStorage.getItem("username");
    if (!username) return;

    const key = JSON.parse(username);
    setProfileState(data);
    localStorage.setItem(key, JSON.stringify(data));
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
