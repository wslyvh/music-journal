import { Button } from "@/components/button";
import { ScreenLayout } from "@/components/screen-layout";
import { router } from "expo-router";
import { useState } from "react";
import { View, Image } from "react-native";
import { Alert } from "@/components/alert";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { CONFIG, INSTRUMENTS } from "@/utils/config";
import { useNotificationPermissions } from "@/hooks/useNotificationPermissions";
import { useAudioPermissions } from "@/hooks/useAudioPermissions";
import { InstrumentPicker } from "@/components/instrument-picker";
import { useProfileMutation } from "@/hooks/profile/useProfileMutation";

export default function Index() {
  const profileMutation = useProfileMutation();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    username: "",
    instrument: "",
    yearsOfExperience: "",
    practiceFrequency: "",
    goals: "",
    createdAt: Date.now(),
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
      !profileData.username ||
      !profileData.instrument ||
      !profileData.yearsOfExperience ||
      !profileData.practiceFrequency ||
      !profileData.goals
    ) {
      setUserError("Please complete all fields");
      return;
    }

    profileMutation.mutate({
      ...profileData,
      yearsOfExperience: Number(profileData.yearsOfExperience ?? 0),
      practiceFrequency: Number(profileData.practiceFrequency ?? 0),
    });
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
                style={{
                  width: 192,
                  height: 192,
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
            value={profileData.username}
            onChangeText={(value) =>
              setProfileData({ ...profileData, username: value })
            }
            placeholder="Enter your (user) name"
            className="my-4"
          />

          <Text>What's the primary instrument that you're playing?</Text>
          <InstrumentPicker
            className="my-4"
            items={INSTRUMENTS}
            selected={profileData.instrument}
            onSelect={(value) =>
              setProfileData({ ...profileData, instrument: value })
            }
          />

          <Text>How many years have you been playing?</Text>
          <Input
            value={profileData.yearsOfExperience}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              setProfileData({
                ...profileData,
                yearsOfExperience: numericValue,
              });
            }}
            placeholder="2"
            keyboardType="numeric"
            className="my-4"
          />

          <Text>How often a week do you practice?</Text>
          <Input
            value={profileData.practiceFrequency.toString()}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              setProfileData({
                ...profileData,
                practiceFrequency: numericValue,
              });
            }}
            placeholder="4"
            keyboardType="numeric"
            className="my-4"
          />

          <Text>What is your goal?</Text>
          <Input
            value={profileData.goals}
            onChangeText={(value) =>
              setProfileData({ ...profileData, goals: value })
            }
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
