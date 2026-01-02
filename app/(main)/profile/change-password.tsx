import { useState } from 'react';
import { Alert, TextInput, StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { supabase } from '@/lib/supabase';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/themed-button';
import { layout } from '@/styles/layout';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'expo-router';

const ChangePasswordScreen = () => {
  const { session } = useAuthStore();
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirm) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: session!.user.email!,
          password: currentPassword,
        });

      if (signInError) throw signInError;

      const { error: updateError } =
        await supabase.auth.updateUser({ password: newPassword });

      if (updateError) throw updateError;

      Alert.alert('Success', 'Password updated');

      router.back();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={[layout.screen, { paddingTop: headerHeight + 16 }]}>
      <TextInput
        placeholder="Current password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="New password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm new password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        style={styles.input}
      />

      <Button
        title="Update password"
        loading={loading}
        onPress={handleChangePassword}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});

export default ChangePasswordScreen;
