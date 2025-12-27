import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { layout } from '@/styles/layout';

const InventoryScreen = () => {
  return (
    <ThemedView style={layout.screen}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Inventory</ThemedText>

        <ThemedText style={styles.subtitle}>
          You don’t have any items yet.
        </ThemedText>

        <ThemedText style={styles.helper}>
          Start by adding your first item to track quantity, cost, and profit.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  helper: {
    fontSize: 14,
    opacity: 0.7,
  },
});
