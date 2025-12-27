import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export const Button = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  const background = useThemeColor({}, 'tint');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: background,
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <ThemedText style={styles.text}>{title}</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
