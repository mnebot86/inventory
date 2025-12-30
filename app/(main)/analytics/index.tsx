import { Alert, ScrollView } from 'react-native';
import { layout } from '@/styles/layout';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  getTotalItems,
  getTotalInvested,
  getPotentialRevenue,
  getEstimatedProfit,
} from '@/services/analytics';
import { AnalyticsStatCard } from '@/components/screens/analytics';

const AnalyticsScreen = () => {
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [totalInvested, setTotalInvested] = useState<number | null>(null);
  const [potentialRevenue, setPotentialRevenue] = useState<number | null>(null);
  const [estimatedProfit, setEstimatedProfit] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadAnalytics = async () => {
        try {
          setLoading(true);

          const [
            items,
            invested,
            revenue,
            profit,
          ] = await Promise.all([
            getTotalItems(),
            getTotalInvested(),
            getPotentialRevenue(),
            getEstimatedProfit(),
          ]);

          if (isActive) {
            setTotalItems(items);
            setTotalInvested(invested);
            setPotentialRevenue(revenue);
            setEstimatedProfit(profit);
          }
        } catch {
          Alert.alert('Error', 'Failed to load analytics');
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      loadAnalytics();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={layout.screen}
    >
      <AnalyticsStatCard
        label="Total Items"
        value={totalItems}
        isLoading={loading}
      />
      <AnalyticsStatCard
        label="Total Invested"
        value={totalInvested}
        isLoading={loading}
      />

      <AnalyticsStatCard
        label="Potential Revenue"
        value={potentialRevenue}
        isLoading={loading}
      />

      <AnalyticsStatCard
        label="Estimated Profit"
        value={estimatedProfit}
        isLoading={loading}
      />
    </ScrollView>
  );
};

export default AnalyticsScreen;
