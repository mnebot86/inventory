import { useAuthStore } from '@/store/auth';
import { Slot } from 'expo-router';
import { useEffect } from 'react';

const RootLayout = () => {
  useEffect(() => {
    useAuthStore.getState().initAuthListener();
  }, []);

  return <Slot />;
};

export default RootLayout;