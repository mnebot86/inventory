import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { layout } from '@/styles/layout';

const AnalyticsScreen = () => {
  return (
    <ThemedView style={layout.screen}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Analytics</ThemedText>

        <ThemedText style={styles.subtitle}>
          No analytics available yet.
        </ThemedText>

        <ThemedText style={styles.helper}>
          Once you start adding and selling inventory, you’ll see insights like
          profit, best sellers, and trends here.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
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
