import { Stack } from 'expo-router';

const ProfileLayout = () => {
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
          title: 'Profile',
        }}
      />

      <Stack.Screen
        name="change-password"
        options={{
          title: 'Change Password',
          // headerShown: false
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
