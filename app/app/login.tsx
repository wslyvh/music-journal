import { Button } from "@/components/button";
import { ScreenLayout } from "@/components/screen-layout";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/format";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput } from "react-native";
import { Alert } from "@/components/alert";

export default function Index() {
  const { account, error, isLoading, requestToken, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [tokenSent, setTokenSent] = useState(false);
  const [userError, setUserError] = useState("");

  async function handleRequestToken() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setUserError("Invalid email format");
      return;
    }

    setUserError("");
    const success = await requestToken(email);
    setTokenSent(success);
  }

  async function handleLogin() {
    if (token.length !== 6) {
      setUserError("Invalid token format");
      return;
    }

    setUserError("");
    const account = await login(email, token);
    if (account) {
      setUserError("");
      setTokenSent(!!account);
      router.replace("/settings");
    } else {
      setUserError("Invalid token. Unable to login.");
    }
  }

  if (account) {
    return (
      <ScreenLayout title="Welcome back 👋">
        <Text className="text-base-content">
          {account.email} since {formatDate(account.createdAt)}
        </Text>
      </ScreenLayout>
    );
  }

  if (tokenSent) {
    return (
      <ScreenLayout title="Confirm token 🔑">
        <Text className="text-base-content">
          Enter the 6-digit token we sent you via email.
        </Text>
        <TextInput
          className="bg-base-300 text-base-content rounded-md px-4 py-3 my-4"
          placeholder="Enter your token"
          value={token}
          onChangeText={setToken}
          keyboardType="numeric"
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          onSubmitEditing={handleLogin}
        />
        <Button onPress={handleLogin} text="Continue" />
        {error && <Alert className="my-4" type="error" text={error} />}
        {userError && (
          <Alert className="my-4" type="warning" text={userError} />
        )}
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Hello 👋">
      <Text className="text-base-content">
        Please enter your email to continue. We will send you a 6-digit token to
        verify your email address.
      </Text>
      <TextInput
        className="bg-base-300 text-base-content rounded-md px-4 py-3 my-4"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        returnKeyType="go"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
      />
      <Button onPress={handleRequestToken} text="Continue" />
      {error && <Alert className="my-4" type="error" text={error} />}
      {userError && <Alert className="my-4" type="warning" text={userError} />}
    </ScreenLayout>
  );
}
