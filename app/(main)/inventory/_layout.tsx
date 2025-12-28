

import { Stack, useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Button } from '@/components/themed-button';

const InventoryLayout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerTitleAlign: 'left',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Inventory',
          headerRight: () => (
            <Button
              icon={<Plus size={22} color="#0a7ea4" />}
              onPress={() => router.push('/(main)/inventory/add-item')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="add-item"
        options={{
          title: 'Add Item',
        }}
      />
    </Stack>
  );
};

export default InventoryLayout;
