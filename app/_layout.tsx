import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';

const RootLayout = () => {
  useEffect(() => {
    useAuthStore.getState().initAuthListener();
  }, []);

  return <Slot />;
};

export default RootLayout;