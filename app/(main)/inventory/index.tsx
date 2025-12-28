import { useCallback, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { layout } from '@/styles/layout';
import { ThemedView } from '@/components/themed-view';
import { InventoryEmptyState, InventoryList } from '@/components/screens/inventory';
import type { InventoryItem } from '@/interfaces/inventory';
import { fetchInventoryItems } from '@/services/inventory';

const InventoryScreen = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadItems = useCallback(async () => {
    setLoading(true);

    try {
      const fetchedItems = await fetchInventoryItems();

      setItems(fetchedItems);
    } catch (err) {
      const message = (err as Error).message;

      Alert.alert('Error loading inventory', message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [loadItems])
  );

  if (loading) {
    return (
      <ThemedView style={[layout.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

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
