import { supabase } from '@/lib/supabase';

export type CreateInventoryItemInput = {
  name: string;
  category: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice?: number;
};

export const createInventoryItem = async (
  input: CreateInventoryItemInput
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('inventory_items')
    .insert({
      user_id: user.id,
      name: input.name,
      category: input.category,
      quantity: input.quantity,
      purchase_price: input.purchasePrice,
      selling_price: input.sellingPrice ?? null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
