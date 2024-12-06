import { Button } from "@/components/button";
import { ScreenLayout } from "@/components/screen-layout";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Alert } from "@/components/alert";
import { Input } from "@/components/input";
import { Text } from "@/components/text";

export default function Index() {
  const { requestCodeMutation, loginMutation, profileMutation } = useAuth();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [onboard, setOnboard] = useState(false);
  const [username, setUsername] = useState("");
  const [instrument, setInstrument] = useState("");
  const [userError, setUserError] = useState("");

  async function handleRequestToken() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setUserError("Invalid email format");
      return;
    }

    requestCodeMutation.mutate(email, {
      onSuccess: () => {
        setUserError("");
      },
    });
  }

  async function handleLogin() {
    if (token.length !== 6) {
      setUserError("Invalid token format");
      return;
    }

    setUserError("");
    loginMutation.mutate(
      { email, token },
      {
        onSuccess: (data) => {
          if (data?.username && data?.instruments) {
            setUserError("");
            router.replace("/settings");
          }

          setOnboard(true);
        },
      }
    );
  }

  async function handleProfileUpdate() {
    if (!username || !instrument) return;

    profileMutation.mutate(
      { username, instruments: [instrument] },
      {
        onSuccess: () => {
          setUserError("");
          router.replace("/settings");
        },
      }
    );
  }

  if (onboard) {
    return (
      <ScreenLayout title="Onboarding 👋">
        <View className="flex">
          <Text>How should we call you?</Text>
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your name"
            className="my-4"
          />

          <Text>
            What's the primary instrument that you're currently playing?
          </Text>
          <Input
            value={instrument}
            onChangeText={setInstrument}
            placeholder="Select your instrument"
            className="my-4"
          />
        </View>

        <Button onPress={handleProfileUpdate} text="Continue" />
        {profileMutation.error && (
          <Alert
            className="my-4"
            type="error"
            text="Failed to update account profile"
          />
        )}
        {userError && (
          <Alert className="my-4" type="warning" text={userError} />
        )}
      </ScreenLayout>
    );
  }

  if (!!requestCodeMutation.data) {
    return (
      <ScreenLayout title="Confirm token 🔑">
        <Text>Enter the 6-digit token we sent you via email.</Text>
        <Input
          className="my-4"
          placeholder="Enter your token"
          value={token}
          onChangeText={(text) => setToken(text.replace(/[^0-9]/g, ""))}
          onSubmitEditing={handleLogin}
          inputMode="numeric"
          returnKeyType="go"
          maxLength={6}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
        />
        <Button onPress={handleLogin} text="Continue" />
        {loginMutation.error && (
          <Alert className="my-4" type="error" text="Failed to login" />
        )}
        {userError && (
          <Alert className="my-4" type="warning" text={userError} />
        )}
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Hello 👋">
      <Text>
        Please enter your email to continue. We will send you a 6-digit token to
        verify your email address.
      </Text>
      <Input
        className="my-4"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={handleRequestToken}
        keyboardType="email-address"
        returnKeyType="go"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
      />
      <Button onPress={handleRequestToken} text="Continue" />
      {requestCodeMutation.error && (
        <Alert className="my-4" type="error" text="Failed to send code" />
      )}
      {userError && <Alert className="my-4" type="warning" text={userError} />}
    </ScreenLayout>
  );
}
