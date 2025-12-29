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

export const fetchInventoryItems = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const fetchInventoryItemById = async (id: string) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export type UpdateInventoryItemInput = {
  name: string;
  category: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice?: number;
};

export const updateInventoryItem = async (
  id: string,
  input: UpdateInventoryItemInput
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('inventory_items')
    .update({
      name: input.name,
      category: input.category,
      quantity: input.quantity,
      purchase_price: input.purchasePrice,
      selling_price: input.sellingPrice ?? null,
    })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    throw error;
  }

  return fetchInventoryItemById(id);
};
