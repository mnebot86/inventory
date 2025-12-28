import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Button } from '@/components/themed-button';
import { useRouter } from 'expo-router';
import { KeyboardScreen } from '@/components/keyboard-view';
import { createInventoryItem } from '@/services/inventory';

const AddItemScreen = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = async () => {
    if (!name.trim()) {
      setError('Item name is required');
      return;
    }

    if (!category.trim()) {
      setError('Category is required');
      return;
    }

    if (!quantity || Number.isNaN(Number(quantity))) {
      setError('Quantity is required and must be a number');
      return;
    }

    if (!price || Number.isNaN(Number(price))) {
      setError('Purchase price is required and must be a number');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await createInventoryItem({
        name: name.trim(),
        category: category.trim(),
        quantity: Number(quantity),
        purchasePrice: Number(price),
        ...(sellingPrice && !Number.isNaN(Number(sellingPrice))
          ? { sellingPrice: Number(sellingPrice) }
          : {}),
      });

      router.back();
    } catch (err: any) {
      setError(err?.message ?? 'Failed to save item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardScreen contentContainerStyle={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          value={name}
          onChangeText={(value) => {
            setName(value);
            setError(null);
          }}
          placeholder="e.g. Nike Hoodie"
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          value={category}
          onChangeText={(value) => {
            setCategory(value);
            setError(null);
          }}
          placeholder="e.g. Clothing"
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, styles.flex]}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            value={quantity}
            onChangeText={(value) => {
              setQuantity(value);
              setError(null);
            }}
            placeholder="0"
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>

        <View style={[styles.field, styles.flex]}>
          <Text style={styles.label}>Purchase Price</Text>
          <TextInput
            value={price}
            onChangeText={(value) => {
              setPrice(value);
              setError(null);
            }}
            placeholder="0.00"
            keyboardType="decimal-pad"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Selling Price (Optional)</Text>
        <TextInput
          value={sellingPrice}
          onChangeText={(value) => {
            setSellingPrice(value);
            setError(null);
          }}
          placeholder="0.00"
          keyboardType="decimal-pad"
          style={styles.input}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button
        title={isSubmitting ? 'Saving...' : 'Save Item'}
        onPress={onSave}
        disabled={isSubmitting}
      />
    </KeyboardScreen>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
});
