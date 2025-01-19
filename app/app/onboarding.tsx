import { Button } from "@/components/button";
import { ScreenLayout } from "@/components/screen-layout";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { View, Image } from "react-native";
import { Alert } from "@/components/alert";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { CONFIG } from "@/utils/config";
import { useNotificationPermissions } from "@/hooks/useNotificationPermissions";
import { useAudioPermissions } from "@/hooks/useAudioPermissions";

export default function Index() {
  const { profileMutation } = useAuth();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    username: "",
    instrument: "",
    practiceTime: "",
    practiceFrequency: "",
    goal: "",
  });
  const [userError, setUserError] = useState("");
  const {
    data: notificationPermissionsEnabled,
    refetch: refetchNotificationPermissions,
  } = useNotificationPermissions();
  const { data: audioPermissionsEnabled, refetch: refetchAudioPermissions } =
    useAudioPermissions();

  async function handleProfileUpdate() {
    if (
      !profile.username ||
      !profile.instrument ||
      !profile.practiceTime ||
      !profile.practiceFrequency ||
      !profile.goal
    ) {
      setUserError("Please complete all fields");
      return;
    }

    // TODO: Add profile update
    setUserError("");
    setStep(3);
  }

  if (step === 1) {
    return (
      <ScreenLayout>
        <View className="flex flex-col items-center justify-center h-full">
          <View className="items-center justify-center my-8">
            <View className="w-48 h-48 rounded-full items-center justify-center overflow-hidden">
              <Image
                source={require("@/assets/images/icon.png")}
                className="w-full h-full"
                resizeMode="cover"
                style={{
                  width: 192,
                  height: 192,
                  resizeMode: "cover",
                }}
              />
            </View>
          </View>

          <View className="flex flex-col items-center">
            <Text className="font-bold text-4xl mb-2">Welcome to</Text>
            <Text className="font-bold text-4xl text-primary">
              {CONFIG.APP_NAME}
            </Text>
          </View>

          <View className="flex flex-col items-center mt-8">
            <Text className="text-xl text-center">
              {CONFIG.APP_DESCRIPTION}
            </Text>
          </View>

          <View className="flex flex-col w-full items-center mt-8">
            <Button
              className="w-full"
              text="Get started"
              onPress={() => setStep(2)}
            />
          </View>
        </View>
      </ScreenLayout>
    );
  }

  if (step === 2) {
    return (
      <ScreenLayout backAction={() => setStep(1)}>
        <View className="flex">
          <Text>How should we call you?</Text>
          <Input
            value={profile.username}
            onChangeText={(value) =>
              setProfile({ ...profile, username: value })
            }
            placeholder="Enter your name"
            className="my-4"
          />

          <Text>What's the primary instrument that you're playing?</Text>
          <Input
            value={profile.instrument}
            onChangeText={(value) =>
              setProfile({ ...profile, instrument: value })
            }
            placeholder="Select your instrument"
            className="my-4"
          />

          <Text>How many years have you been playing?</Text>
          <Input
            value={profile.practiceTime}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              setProfile({ ...profile, practiceTime: numericValue });
            }}
            placeholder="2"
            keyboardType="numeric"
            className="my-4"
          />

          <Text>How often a week do you practice?</Text>
          <Input
            value={profile.practiceFrequency}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              setProfile({ ...profile, practiceFrequency: numericValue });
            }}
            placeholder="4"
            keyboardType="numeric"
            className="my-4"
          />

          <Text>What is your goal?</Text>
          <Input
            value={profile.goal}
            onChangeText={(value) => setProfile({ ...profile, goal: value })}
            placeholder="E.g. Learn a new song or play in a band."
            className="my-4"
            multiline
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

  if (step === 3) {
    return (
      <ScreenLayout backAction={() => setStep(2)}>
        <View className="flex">
          <Text className="text-xl">Stay connected</Text>
          <Text className="mt-2">
            Enable notifications to receive reminders to practice and help you
            track your progress. You can always change this later.
          </Text>

          <Button
            onPress={() => refetchNotificationPermissions()}
            text={
              notificationPermissionsEnabled
                ? "Notifications enabled"
                : "Enable notifications"
            }
            type={notificationPermissionsEnabled ? "outline" : "primary"}
            disabled={notificationPermissionsEnabled}
            className="mt-4"
          />
        </View>

        <View className="flex mt-4">
          <Text className="text-xl">Recordings</Text>
          <Text className="mt-2">
            Enable microphone access to record your practice sessions. You can
            always change this later.
          </Text>

          <Button
            onPress={() => refetchAudioPermissions()}
            text={
              audioPermissionsEnabled
                ? "Microphone enabled"
                : "Enable microphone"
            }
            type={audioPermissionsEnabled ? "outline" : "primary"}
            disabled={audioPermissionsEnabled}
            className="mt-4"
          />
        </View>

        <Button onPress={() => setStep(4)} text="Continue" className="mt-4" />
      </ScreenLayout>
    );
  }

  if (step === 4) {
    return (
      <ScreenLayout backAction={() => setStep(3)}>
        <View className="flex flex-col items-center justify-center h-full">
          <Text className="text-xl">
            We've set up your account. You're all set! Grab your instrument and
            start recording a new practice session!
          </Text>
        </View>

        <Button
          onPress={() => router.push("/start")}
          text="Start recording"
          className="mt-4"
        />
      </ScreenLayout>
    );
  }

  return null;
}
