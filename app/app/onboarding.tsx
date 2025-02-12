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
import dayjs from "dayjs";

export default function Index() {
  const profileMutation = useProfileMutation();
  const [step, setStep] = useState(1);
  const [instrument, setInstrument] = useState("");
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    referral: "",
    profession: "",
    instrument: "",
    yearsOfExperience: "",
    practiceFrequency: "",
    goals: "",
    createdAt: dayjs().unix(),
  });
  const [userError, setUserError] = useState("");
  const {
    data: notificationPermissionsEnabled,
    refetch: refetchNotificationPermissions,
  } = useNotificationPermissions(false);
  const { data: audioPermissionsEnabled, refetch: refetchAudioPermissions } =
    useAudioPermissions(false);

  async function validateProfileData() {
    if (!profileData.username) {
      setUserError("Please complete required fields");
      return;
    }

    setUserError("");
    setStep(3);
  }

  async function handleProfileUpdate() {
    if (
      !profileData.username ||
      !profileData.instrument ||
      !profileData.goals
    ) {
      setUserError("Please complete required fields");
      return;
    }

    if (profileData.instrument === "Other" && !instrument) {
      setUserError("Please enter the instrument you play");
      return;
    }

    profileMutation.mutate({
      ...profileData,
      instrument:
        profileData.instrument === "Other"
          ? instrument
          : profileData.instrument,
      yearsOfExperience: Number(profileData.yearsOfExperience ?? 0),
      practiceFrequency: Number(profileData.practiceFrequency ?? 0),
    });

    setUserError("");
    setStep(4);
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

          <View className="flex flex-col items-center mt-8">
            <Text className="text-sm text-center">
              This onboarding process will take about 2 minutes. Most data is
              optional and is only used to help us improve the app.
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
          <Text>
            How should we call you? <Text className="text-primary">*</Text>
          </Text>
          <Input
            value={profileData.username}
            onChangeText={(value) =>
              setProfileData({ ...profileData, username: value })
            }
            placeholder="Enter your (user) name"
            className="my-4"
          />

          <Text>What's your email?</Text>
          <Input
            value={profileData.email}
            onChangeText={(value) =>
              setProfileData({ ...profileData, email: value })
            }
            placeholder="hello@musicjournal.fm"
            className="my-4"
            showClear
          />

          <Text>What do you do for a living?</Text>
          <Input
            value={profileData.profession}
            onChangeText={(value) =>
              setProfileData({ ...profileData, profession: value })
            }
            placeholder="e.g. Musician, teacher, student, etc."
            className="my-4"
          />

          <Text>How did you hear about the App?</Text>
          <Input
            value={profileData.referral}
            onChangeText={(value) =>
              setProfileData({ ...profileData, referral: value })
            }
            placeholder="e.g. Google, friend, social media, etc."
            className="my-4"
          />

          <Button
            onPress={validateProfileData}
            text="Continue"
            className="mt-4"
          />

          {userError && (
            <Alert className="my-4" type="warning" text={userError} />
          )}
        </View>
      </ScreenLayout>
    );
  }

  if (step === 3) {
    return (
      <ScreenLayout backAction={() => setStep(2)}>
        <Text>
          What's the primary instrument that you're playing?{" "}
          <Text className="text-primary">*</Text>
        </Text>
        <InstrumentPicker
          className="my-4"
          items={["", ...INSTRUMENTS]}
          selected={profileData.instrument}
          onSelect={(value) =>
            setProfileData({ ...profileData, instrument: value })
          }
        />

        {profileData.instrument === "Other" && (
          <Input
            value={instrument}
            onChangeText={(value) => {
              setInstrument(value);
            }}
            placeholder="e.g. Cello, Saxophone, etc."
            className="my-4"
          />
        )}

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
          numeric
          placeholder="2"
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
          numeric
          placeholder="4"
          className="my-4"
        />

        <Text>
          What are your goals? <Text className="text-primary">*</Text>
        </Text>
        <Input
          value={profileData.goals}
          onChangeText={(value) =>
            setProfileData({ ...profileData, goals: value })
          }
          placeholder="E.g. Learn a new song or play in a band."
          className="my-4"
          numberOfLines={3}
          textAlignVertical="top"
          style={{ textAlignVertical: "top" }}
          multiline
        />

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

        <Button
          onPress={handleProfileUpdate}
          text="Continue"
          className="mt-4"
        />
      </ScreenLayout>
    );
  }

  if (step === 4) {
    return (
      <ScreenLayout backAction={() => setStep(3)}>
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

        <Button onPress={() => setStep(5)} text="Continue" className="mt-4" />
      </ScreenLayout>
    );
  }

  if (step === 5) {
    return (
      <ScreenLayout backAction={() => setStep(4)}>
        <View className="flex flex-col items-center justify-center h-full">
          <Text className="text-xl">
            You're all set! Grab your instrument and start recording a new
            practice session!
          </Text>
        </View>

        <Button
          onPress={() => router.push("/practice")}
          text="Start recording"
          className="mt-4"
        />
      </ScreenLayout>
    );
  }

  return null;
}
