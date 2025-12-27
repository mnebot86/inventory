import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export const InventoryEmptyState = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Inventory</ThemedText>

      <ThemedText style={styles.text}>
        You don’t have any items yet.
      </ThemedText>

      <ThemedText style={styles.subtext}>
        Add your first item to track quantity, cost, and profit.
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  text: {
    marginTop: 12,
  },
  subtext: {
    marginTop: 4,
    opacity: 0.7,
  },
});