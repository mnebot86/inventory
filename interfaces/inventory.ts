export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category?: string;
  cost: number;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
}
