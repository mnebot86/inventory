import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { supabase } from '@/lib/supabase';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { layout } from '@/styles/layout';
import { KeyboardScreen } from '@/components/keyboard-view';
import { Button } from '@/components/themed-button';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const borderColor = useThemeColor({}, 'icon');
  const background = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const resetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'inventory://reset-password',
    });

    if (error) {
      alert(error.message);
      return;
    }

    setSent(true);
  };

  return (
    <KeyboardScreen contentContainerStyle={[layout.screen, { justifyContent: 'center' }]}>
      <ThemedView style={layout.card}>
        <ThemedText type="title" style={styles.title}>
          Reset password
        </ThemedText>

        {sent ? (
          <ThemedText style={styles.message}>
            If an account exists for this email, a password reset link has been sent.
          </ThemedText>
        ) : (
          <>
            <ThemedText style={styles.subtitle}>
              Enter your email and we’ll send you a reset link.
            </ThemedText>

            <TextInput
              placeholder="Email"
              placeholderTextColor={borderColor}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              style={[
                styles.input,
                { borderColor, backgroundColor: background, color: textColor },
              ]}
            />

            <Button title="Send reset link" onPress={resetPassword} />
          </>
        )}

        <Link href="/(auth)/login">
          <ThemedText type="link" style={styles.link}>
            Back to login
          </ThemedText>
        </Link>
      </ThemedView>
    </KeyboardScreen>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 12,
    fontSize: 16,
  },
  message: {
    marginBottom: 16,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontWeight: '600',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
  },
});
