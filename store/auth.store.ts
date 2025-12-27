import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthState = {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
  initAuthListener: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoading: true,

  initAuthListener: async () => {
    const { data } = await supabase.auth.getSession();

    set({
      session: data.session,
      isLoading: false,
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
    });
  },

  setSession: (session) => set({ session, isLoading: false }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null });
  },
}));
