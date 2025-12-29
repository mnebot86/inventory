import { FlashList } from '@shopify/flash-list';
import { InventoryRow } from './row';
import { InventoryItem } from '@/interfaces/inventory';
import { router } from 'expo-router';

type Props = {
  items: InventoryItem[];
};

export const InventoryList = ({ items }: Props) => {
  const handlePressItem = (id: string) => {
    router.push(`/(main)/inventory/${id}`);
  };

  return (
    <FlashList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <InventoryRow item={item} onPress={() => handlePressItem(item.id)} />
      )}
      // estimatedItemSize={84}
      contentContainerStyle={{ padding: 16 }}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
};
