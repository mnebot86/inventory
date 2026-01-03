import { supabase } from '@/lib/supabase';

export const deleteAccount = async () => {
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (!session) {
    throw new Error('Not authenticated');
  }

  const { error } = await supabase.functions.invoke('delete-account', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    throw error;
  }
};
