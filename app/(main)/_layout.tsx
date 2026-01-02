import { useAuthStore } from '@/store/auth';
import { Redirect, Tabs } from 'expo-router';
import { BarChart3, Package, User } from 'lucide-react-native';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainLayout = () => {
  const { session, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#0a7ea4',
          tabBarInactiveTintColor: '#8e8e93',
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="inventory"
          options={{
            title: 'Inventory',
            tabBarLabel: 'Inventory',
            tabBarIcon: ({ color, size }) => (
              <Package color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarLabel: 'Analytics',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <BarChart3 color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <User color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default MainLayout;
