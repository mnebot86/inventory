export interface InventoryItem {
  id: string;
  user_id: string;
  name: string;
  category: string;
  quantity: number;
  purchase_price: number;
  selling_price?: number | null;
  created_at: string;
}
