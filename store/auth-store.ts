import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  senderId: string | null;
  name: string | null;
  role: string | null;
  appAccess?: string | null;
  notificationToken?: string | null;
  pkg?: string | null;
  setAuth: (
    token?: string,
    senderId?: string,
    name?: string,
    role?: string,
    appAccess?: string,
    pkg?: string,
  ) => void;
  setNotificationToken: (notificationToken: string) => void;
  clearAuth: () => void;
}

export const AuthStore = create<AuthState>()(
  persist((set) => ({
    token: null,
    senderId: null,
    name: null,
    role: null,
    appAccess: null,
    notificationToken: null,
    pkg: null,
  })),
);
