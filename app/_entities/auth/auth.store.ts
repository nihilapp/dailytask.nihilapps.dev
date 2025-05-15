import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserSession } from '@/_entities/users';

interface AuthActions {
  setUserSession: (userSession: UserSession | null) => void;
  setSignInCallBackUrl: (signInCallBackUrl: string | null) => void;
}

interface AuthState {
  signInCallBackUrl: string | null;
  userSession: UserSession | null;
  actions: AuthActions;
}

const createAuthSlice: StateCreator<
  AuthState,
  [['zustand/immer', never]]
> = (set) => ({
  signInCallBackUrl: null,
  userSession: null,
  actions: {
    setUserSession: (userSession: UserSession | null) => set(
      (state) => {
        state.userSession = userSession;
      }
    ),
    setSignInCallBackUrl: (signInCallBackUrl: string | null) => set(
      (state) => {
        state.signInCallBackUrl = signInCallBackUrl;
      }
    ),
  },
});

const useAuthStore = create<AuthState>()(
  persist(
    immer(createAuthSlice),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ userSession: state.userSession, }),
    }
  )
);

export const useUserSession = () => useAuthStore((state) => state.userSession);

export const useSignInCallBackUrl = () => useAuthStore((state) => state.signInCallBackUrl);

export const useAuthActions = () => useAuthStore((state) => state.actions);
