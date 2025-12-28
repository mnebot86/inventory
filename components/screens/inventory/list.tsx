import { FlashList } from '@shopify/flash-list';
import { InventoryRow } from './row';
import { InventoryItem } from '@/interfaces/inventory';

type Props = {
  items: InventoryItem[];
};

export const InventoryList = ({ items }: Props) => {
  return (
    <FlashList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <InventoryRow item={item} />
      )}
      estimatedItemSize={84}
      contentContainerStyle={{ padding: 16 }}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
};
