import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type AnalyticsStatCardProps = {
  label: string;
  value: number | null;
  isLoading?: boolean;
};

const AnalyticsStatCard = ({
  label,
  value,
  isLoading = false,
}: AnalyticsStatCardProps) => {
  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.label}>{label}</ThemedText>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : (
        <ThemedText style={styles.value}>
          {value === null ? '—' : value}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default AnalyticsStatCard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  value: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 44,
  },
  loader: {
    height: 44,
    justifyContent: 'center',
  },
});
