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
  // setNotificationToken: (notificationToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      senderId: null,
      name: null,
      role: null,
      appAccess: null,
      // notificationToken: null,
      pkg: null,
      setAuth: (token, senderId, name, role, appAccess, pkg) => {
        set((state) => ({
          ...state,
          token: token,
          senderId: senderId,
          name: name,
          role: role,
          appAccess: appAccess,
          pkg: pkg,
        }));
      },

      // setNotificationToken: (notificationToken) =>
      //   set({
      //     notificationToken,
      //   }),

      clearAuth: () => {
        set({
          token: null,
          senderId: null,
          name: null,
          role: null,
          appAccess: null,
          pkg: null,
        });
      },
    }),
    {
      name: "auth-storage", // name of the storage where we store this data
    },
  ),
);

//// Yeh syntax mein pehle create<AuthState>() ek function hai jo ek naya store setup karta hai. Uske baad jo function return hota hai, uspe hum persist lagate hain. Persist ka kaam hai Zustand ke state ko localStorage mein save aur restore karna. Matlab jab bhi state update hoga, persist usse storage mein save kar dega, aur refresh ke baad wahi state wapas la dega. ise bolte h higher order function bolte h (ek function ko return karta h or uss return function ko call karahe h)
