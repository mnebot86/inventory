import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { layout } from '@/styles/layout';
import { Button } from '@/components/themed-button';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { deleteAccount } from '@/services/accounts';

const ProfileScreen = () => {
  const { session, signOut } = useAuthStore();
  const router = useRouter();

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete account',
      'This will permanently delete your account and ALL associated data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Final confirmation',
              'Are you absolutely sure? All your inventory, analytics, and account data will be permanently removed.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete account',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await deleteAccount();
                      await signOut();
                    } catch (error: any) {
                      Alert.alert(
                        'Account deletion failed',
                        error?.message ?? 'Something went wrong while deleting your account. Please try again.'
                      );
                    }
                  },
                },
              ],
            );
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      contentContainerStyle={layout.screen}
      contentInsetAdjustmentBehavior="automatic">
      <ThemedView style={styles.card}>
        <ThemedText type="title">Account</ThemedText>

        <ThemedText style={styles.label}>Email</ThemedText>
        <ThemedText style={styles.value}>
          {session?.user?.email ?? 'Unknown'}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText style={{ marginBottom: 12 }} type="subtitle">Actions</ThemedText>

        <Button
          title="Change password"
          onPress={() => router.push('/(main)/profile/change-password')}
          style={{ marginBottom: 12 }}
        />

        <Button
          title="Log out"
          variant="danger"
          onPress={signOut}
        />
      </ThemedView>

      <ThemedView style={[styles.card, { borderColor: '#ff4d4f', borderWidth: 1 }]}>
        <ThemedText type="subtitle" style={{ marginBottom: 12 }}>
          Danger zone
        </ThemedText>

        <Button
          title="Delete account"
          variant="danger"
          onPress={handleDeleteAccount}
        />
      </ThemedView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  label: {
    marginTop: 12,
    fontSize: 14,
    opacity: 0.6,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
});
