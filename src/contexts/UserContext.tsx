import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface UserContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [username, setUsername] = useState<string | null>(() => {
    const saved = localStorage.getItem("username");
    if (!saved) return null;

    try {
      return JSON.parse(saved);
    } catch (error) {
      return saved;
    }
  });

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}