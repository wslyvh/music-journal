import { AccountBanner } from "@/components/account/banner";
import { ScreenLayout } from "@/components/screen-layout";
import { router } from "expo-router";
import { View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/button";

export default function Settings() {
  const { account, profileMutation } = useAuth();
  const [username, setUsername] = useState(account?.username);
  const [instrument, setInstrument] = useState(account?.instruments[0]);
  const [userError, setUserError] = useState("");

  useEffect(() => {
    setUsername(account?.username);
    setInstrument(account?.instruments[0]);
  }, [account]);

  async function handleProfileUpdate() {
    if (!username || !instrument) return;

    profileMutation.mutate(
      { username, instruments: [instrument] },
      {
        onSuccess: (data) => {
          setUserError("");
          router.replace("/settings");
        },
      }
    );
  }

  return (
    <ScreenLayout title="Update Profile">
      <AccountBanner />

      <View className="text-base-content">
        <Input
          className="mt-4"
          placeholder="Enter your (user) name"
          value={username}
          onChangeText={setUsername}
        />

        <Input
          className="mt-4"
          placeholder="Select your instrument"
          value={instrument}
          onChangeText={setInstrument}
        />
      </View>

      <View className="flex flex-col justify-center space-between mt-8 gap-4">
        <Button
          onPress={() => router.push("/settings")}
          text="Cancel"
          type="neutral"
        />
        <Button
          onPress={handleProfileUpdate}
          text="Update Profile"
          type="primary"
        />
      </View>
    </ScreenLayout>
  );
}
