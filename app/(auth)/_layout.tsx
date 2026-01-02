import { useAuthStore } from '@/store/auth';
import { Redirect, Slot } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

const AuthLayout = () => {
  const { session, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Loading...</Text>
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(main)/inventory" />;
  }

  return <Slot />;
};

export default AuthLayout;
