import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, ActivityIndicator, View, TextInput } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/themed-button';
import { layout } from '@/styles/layout';

import {
  fetchInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem
} from '@/services/inventory';
import { InventoryItem } from '@/interfaces/inventory';

const InventoryItemScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const [item, setItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  const loadItem = useCallback(async () => {
    try {
      const data = await fetchInventoryItemById(id);
      setItem(data);

      setName(data.name);
      setCategory(data.category);
      setQuantity(String(data.quantity));
      setPurchasePrice(String(data.purchase_price));
      setSellingPrice(
        data.selling_price !== null ? String(data.selling_price) : ''
      );
    } catch (err) {
      Alert.alert('Error loading item', (err as Error).message);

      router.back();
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  const onSave = useCallback(async () => {
    if (!item) return;

    try {
      await updateInventoryItem(item.id, {
        name,
        category,
        quantity: Number(quantity),
        purchasePrice: Number(purchasePrice),
        sellingPrice: sellingPrice ? Number(sellingPrice) : undefined,
      });

      router.back();
    } catch (err) {
      Alert.alert('Error saving item', (err as Error).message);
    }
  }, [
    item,
    name,
    category,
    quantity,
    purchasePrice,
    sellingPrice,
    router,
  ]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteInventoryItem(id);
              router.replace('/(main)/inventory');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete item.');
            }
          },
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item?.name ?? 'Item',
      headerRight: () =>
        isEditing ? (
          <Button title="Save" onPress={onSave} />
        ) : (
          <Button title="Edit" onPress={() => setIsEditing(true)} />
        ),
      headerLeft: () =>
        isEditing ? (
          <Button
            title="Cancel"
            onPress={() => {
              if (item) {
                setName(item.name);
                setCategory(item.category);
                setQuantity(String(item.quantity));
                setPurchasePrice(String(item.purchase_price));
                setSellingPrice(
                  item.selling_price !== null
                    ? String(item.selling_price)
                    : ''
                );
              }
              setIsEditing(false);
            }}
          />
        ) : undefined,
    });
  }, [isEditing, navigation, onSave, item]);

  if (loading) {
    return (
      <ThemedView style={[layout.screen, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!item) {
    return (
      <ThemedView
        style={[
          layout.screen,
          { justifyContent: 'center', alignItems: 'center', paddingTop: headerHeight },
        ]}
      >
        <ThemedText type="subtitle">Item not found</ThemedText>
        <ThemedText style={{ marginTop: 8, textAlign: 'center' }}>
          This item may have been deleted or is no longer available.
        </ThemedText>

        <View style={{ marginTop: 24 }}>
          <Button title="Back to Inventory" onPress={() => router.back()} />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[layout.screen, { paddingTop: headerHeight }]}>
      <View style={[layout.section, { marginTop: 16 }]}>
        <ThemedText type="subtitle">Name</ThemedText>

        {isEditing ? (
          <TextInput
            value={name}
            onChangeText={setName}
            style={layout.input}
            placeholder="Item name"
          />
        ) : (
          <ThemedText>{item.name}</ThemedText>
        )}
      </View>

      <View style={layout.section}>
        <ThemedText type="subtitle">Category</ThemedText>

        {isEditing ? (
          <TextInput
            value={category}
            onChangeText={setCategory}
            style={layout.input}
            placeholder="Category"
          />
        ) : (
          <ThemedText>{item.category}</ThemedText>
        )}
      </View>

      <View style={layout.section}>
        <ThemedText type="subtitle">Quantity</ThemedText>
        {isEditing ? (
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            style={layout.input}
            keyboardType="number-pad"
            placeholder="0"
          />
        ) : (
          <ThemedText>{item.quantity}</ThemedText>
        )}
      </View>

      <View style={layout.section}>
        <ThemedText type="subtitle">Purchase Price</ThemedText>

        {isEditing ? (
          <TextInput
            value={purchasePrice}
            onChangeText={setPurchasePrice}
            style={layout.input}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />
        ) : (
          <ThemedText>${item.purchase_price.toFixed(2)}</ThemedText>
        )}
      </View>

      <View style={layout.section}>
        <ThemedText type="subtitle">Selling Price</ThemedText>

        {isEditing ? (
          <TextInput
            value={sellingPrice}
            onChangeText={setSellingPrice}
            style={layout.input}
            keyboardType="decimal-pad"
            placeholder="Optional"
          />
        ) : (
          <ThemedText>
            {item.selling_price !== null
              ? `$${item.selling_price?.toFixed(2)}`
              : '—'}
          </ThemedText>
        )}
      </View>

      {isEditing && (
        <View style={{ marginTop: 32 }}>
          <Button
            title="Delete Item"
            variant="danger"
            onPress={handleDelete}
          />
        </View>
      )}
    </ThemedView>
  );
};

export default InventoryItemScreen;
