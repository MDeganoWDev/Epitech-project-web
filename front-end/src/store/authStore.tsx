import { create } from 'zustand';

type AthenticationState = {
    isAuthenticated?: boolean;
};

type AuthenticationAction = {
    setAuthenticated: (isAuth?: boolean) => void;
    clearAuthentication: () => void;
};

export const useAuthStore = create<AthenticationState & AuthenticationAction>((set) => ({
    isAuthenticated: !!document.cookie.includes('token'), // Check if token cookie exists
    setAuthenticated: (value: any) => set({ isAuthenticated: value }),
    clearAuthentication: () => set({ isAuthenticated: false }),
  }));
