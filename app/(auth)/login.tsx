import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';

import { supabase } from '@/lib/supabase';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { layout } from '@/styles/layout';
import { Button } from '@/components/themed-button';
import { KeyboardScreen } from '@/components/keyboard-view';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const borderColor = useThemeColor({}, 'icon');
  const background = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardScreen contentContainerStyle={[layout.screen, { justifyContent: 'center' }]}>
      <ThemedView style={layout.card}>
        <ThemedText type="title" style={styles.title}>
          Login
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

        <TextInput
          placeholder="Password"
          placeholderTextColor={borderColor}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[
            styles.input,
            { borderColor, backgroundColor: background, color: textColor },
          ]}
        />

        <Button title="Login" onPress={login} />

        <Link href="/(auth)/forgot-password">
          <ThemedText type="link" style={styles.link}>
            Forgot password?
          </ThemedText>
        </Link>

        <Link href="/(auth)/register">
          <ThemedText type="link" style={styles.link}>
            Create an account
          </ThemedText>
        </Link>
      </ThemedView>
    </KeyboardScreen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
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
