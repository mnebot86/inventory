

import { Stack, useRouter } from 'expo-router';
import { BarChart3, Plus } from 'lucide-react-native';
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
          title: 'Analytics',
        }}
      />
    </Stack>
  );
};

export default InventoryLayout;
