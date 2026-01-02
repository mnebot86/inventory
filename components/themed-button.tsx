import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ActivityIndicator, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type ButtonProps = {
  title?: string;
  icon?: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'danger' | 'ghost';
  style?: ViewStyle;
};

const getVariantStyles = (
  variant: 'primary' | 'danger' | 'ghost',
  tint: string
) => {
  switch (variant) {
    case 'danger':
      return { backgroundColor: '#dc2626' };
    case 'ghost':
      return { backgroundColor: 'transparent' };
    default:
      return { backgroundColor: tint };
  }
};

export const Button = ({ title, icon, onPress, disabled, loading, variant, style }: ButtonProps) => {
  const tint = useThemeColor({}, 'tint');

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        getVariantStyles(variant ?? 'primary', tint),
        title ? styles.buttonWithText : styles.iconOnlyButton,
        { opacity: pressed ? 0.6 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? tint : '#fff'} />
      ) : title ? (
        <View style={styles.content}>
          {icon}
          <ThemedText style={styles.text}>{title}</ThemedText>
        </View>
      ) : (
        icon
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 12,
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
  buttonWithText: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  iconOnlyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
