import { supabase } from '@/lib/supabase';

export const getTotalItems = async (): Promise<number> => {
  const { data, error } = await supabase.rpc('get_total_items');

  if (error) {
    throw error;
  }

  return data ?? 0;
};


export const getTotalInvested = async (): Promise<number> => {
  const { data, error } = await supabase.rpc('get_total_invested');

  if (error) {
    throw error;
  }

  return data ?? 0;
};

export const getPotentialRevenue = async (): Promise<number> => {
  const { data, error } = await supabase.rpc('get_potential_revenue');

  if (error) {
    throw error;
  }

  return data ?? 0;
};

export const getEstimatedProfit = async (): Promise<number> => {
  const { data, error } = await supabase.rpc('get_estimated_profit');

  if (error) {
    throw error;
  }

  return data ?? 0;
};
