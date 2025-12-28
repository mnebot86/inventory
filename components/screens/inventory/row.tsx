import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { InventoryItem } from '@/interfaces/inventory';

type Props = {
  item: InventoryItem;
  onPress?: () => void;
};

export const InventoryRow = ({ item, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      {({ pressed }) => (
        <ThemedView
          style={[
            styles.container,
            pressed && styles.pressed,
          ]}
        >
          <ThemedText type="defaultSemiBold">
            {item.name}
          </ThemedText>

          <ThemedText style={styles.meta}>
            {item.category ?? 'Uncategorized'} • Qty: {item.quantity}
          </ThemedText>

          <ThemedText style={styles.price}>
            ${item.purchase_price.toFixed(2)}
            {item.selling_price !== null && item.selling_price !== undefined
              ? ` → $${item.selling_price.toFixed(2)}`
              : ''}
          </ThemedText>
        </ThemedView>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 12,
  },
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  pressed: {
    opacity: 0.7,
  },
  meta: {
    marginTop: 4,
    opacity: 0.7,
  },
  price: {
    marginTop: 6,
  },
});
