import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type ButtonProps = {
  title?: string;
  icon?: ReactNode;
  onPress: () => void;
  disabled?: boolean;
};

export const Button = ({ title, icon, onPress, disabled }: ButtonProps) => {
  const tint = useThemeColor({}, 'tint');

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: title ? tint : 'transparent',
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        {icon}
        {title ? <ThemedText style={styles.text}>{title}</ThemedText> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
  },
});
