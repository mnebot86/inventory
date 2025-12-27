import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import { Link } from 'expo-router';

import { supabase } from '@/lib/supabase';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { layout } from '@/styles/layout';
import { KeyboardScreen } from '@/components/keyboard-view';
import { Button } from '@/components/themed-button';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const borderColor = useThemeColor({}, 'icon');
  const background = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');

  const register = async () => {
    const { error } = await supabase.auth.signUp({
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
          Create account
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

        <Button title="Register" onPress={register} />

        <Link href="/(auth)/login">
          <ThemedText type="link" style={styles.link}>
            Already have an account? Login
          </ThemedText>
        </Link>
      </ThemedView>
    </KeyboardScreen>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 12,
    padding: 24,
  },
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
