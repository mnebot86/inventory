import { ThemedView } from '@/components/themed-view';
import { InventoryEmptyState, InventoryList } from '@/components/screens/inventory';
import type { InventoryItem } from '@/interfaces/inventory';
import { layout } from '@/styles/layout';

const MOCK_ITEMS: InventoryItem[] = [
  {
    id: '1',
    name: 'Laundry Detergent',
    category: 'Household',
    quantity: 5,
    cost: 3.5,
    price: 8.99,
  },
  {
    id: '2',
    name: 'Protein Bars',
    category: 'Food',
    quantity: 12,
    cost: 1.2,
    price: 2.99,
  },
];

const InventoryScreen = () => {
  const items = MOCK_ITEMS;

  return (
    <ThemedView style={layout.screen}>
      {items.length === 0 ? (
        <InventoryEmptyState />
      ) : (
        <InventoryList items={items} />
      )}
    </ThemedView>
  );
};

export default InventoryScreen;
