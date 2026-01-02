import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { layout } from '@/styles/layout';
import { Button } from '@/components/themed-button';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const { session, signOut } = useAuthStore();
  const router = useRouter();

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
