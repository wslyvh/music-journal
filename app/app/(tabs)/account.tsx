import React, { useState } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/format";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function LoginScreen() {
  const { account, isLoading, error, requestToken, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [tokenSent, setTokenSent] = useState(false);

  async function handleRequestToken() {
    const success = await requestToken(email);
    setTokenSent(success);
  }

  async function handleLogin() {
    const account = await login(email, token);
    setTokenSent(!!account);
  }

  async function handleLogout() {
    setEmail("");
    setToken("");
    setTokenSent(false);
    await logout();
  }

  if (account) {
    return (
      <ThemedView>
        <ThemedText type="icon" style={styles.marginBottomLarge}>
          👤
        </ThemedText>
        <ThemedText type="title" style={styles.marginBottom}>
          {account.email}
        </ThemedText>
        <ThemedText style={styles.marginBottomLarge}>
          {`Since ${formatDate(account.createdAt)}`}
        </ThemedText>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  if (tokenSent) {
    return (
      <ThemedView>
        <ThemedText type="icon" style={styles.marginBottomLarge}>
          🔑
        </ThemedText>
        <ThemedText type="title" style={styles.marginBottom}>
          Enter your token
        </ThemedText>
        <ThemedText style={styles.marginBottomLarge}>
          Enter the 6-digit token we sent you via email.
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter your token"
          placeholderTextColor="#999"
          value={token}
          onChangeText={setToken}
          keyboardType="numeric"
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          onSubmitEditing={handleLogin}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <>
      <ThemedView>
        <ThemedText type="icon" style={styles.marginBottomLarge}>
          👋
        </ThemedText>
        <ThemedText type="title" style={styles.marginBottom}>
          Hello
        </ThemedText>
        <ThemedText style={styles.marginBottomLarge}>
          Please enter your email to continue. We will send you a 6-digit token
          to verify your email address.
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
        />
        <TouchableOpacity style={styles.button} onPress={handleRequestToken}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {error && <Text style={styles.alert}>{error}</Text>}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 10,
  },
  marginBottomLarge: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    backgroundColor: "#4287f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  alert: {
    backgroundColor: "#f00",
    color: "#fff",
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
  },
});
