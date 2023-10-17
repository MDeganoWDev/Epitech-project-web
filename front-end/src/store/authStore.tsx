import { create } from 'zustand';

type AthenticationState = {
    isAuthenticated?: boolean;
    token?: string;
    id? : number;
};

type AuthenticationAction = {
    setAuthenticated: (isAuth?: boolean) => void;
    clearAuthentication: () => void;
    setId: (id?: number) => void;
};

export const useAuthStore = create<AthenticationState & AuthenticationAction>((set) => ({
    isAuthenticated: !!document.cookie.includes('token'), // Check if token cookie exists
    token: document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1],
    setAuthenticated: (value: any) => set({ isAuthenticated: value }),
    clearAuthentication: () => set({ isAuthenticated: false }),
    setId: (id?: number) => set({ id }),
  }));
