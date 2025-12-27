import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { layout } from '@/styles/layout';
import { Button } from '@/components/themed-button';
import { supabase } from '@/lib/supabase';

const ProfileScreen = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ThemedView style={layout.screen}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Profile</ThemedText>

        <ThemedText style={styles.subtitle}>
          Account & Settings
        </ThemedText>

        <ThemedText style={styles.helper}>
          More account options will be available here in the future.
        </ThemedText>

        <Button title="Log out" onPress={handleLogout} />
      </ThemedView>
    </ThemedView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  helper: {
    fontSize: 14,
    opacity: 0.7,
  },
});
