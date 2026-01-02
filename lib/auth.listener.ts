import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth';

export const initAuthListener = () => {
  const setSession = useAuthStore.getState().setSession;

  supabase.auth.getSession().then(({ data }) => {
    setSession(data.session);
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });
};
