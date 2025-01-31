import { AccountBanner } from "@/components/account/banner";
import { ScreenLayout } from "@/components/screen-layout";
import { router } from "expo-router";
import { View } from "react-native";
import { Input } from "@/components/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { useProfileMutation } from "@/hooks/profile/useProfileMutation";
import { useProfile } from "@/hooks/profile/useProfile";
import { InstrumentPicker } from "@/components/instrument-picker";
import { INSTRUMENTS } from "@/utils/config";

export default function Settings() {
  const { data: profile } = useProfile();
  const profileMutation = useProfileMutation();
  const [profileData, setProfileData] = useState(
    profile ?? {
      username: "",
      instrument: "",
      yearsOfExperience: "",
      practiceFrequency: "",
      goals: "",
      createdAt: Date.now(),
    }
  );
  const [userError, setUserError] = useState("");

  useEffect(() => {
    console.log("profile", profile);
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);

  async function handleProfileUpdate() {
    if (!profileData) return;

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

    profileMutation.mutate(
      {
        ...profileData,
        yearsOfExperience: Number(profileData.yearsOfExperience ?? 0),
        practiceFrequency: Number(profileData.practiceFrequency ?? 0),
      },
      {
        onSuccess: () => {
          setUserError("");
          router.replace("/settings");
        },
      }
    );
  }

  return (
    <ScreenLayout title="Update Profile" goBack>
      <AccountBanner />

      <View className="text-base-content gap-4">
        <Input
          className="mt-4"
          placeholder="Enter your (user) name"
          value={profileData?.username ?? ""}
          onChangeText={(value) =>
            setProfileData({ ...profileData, username: value })
          }
        />

        <InstrumentPicker
          className=""
          items={INSTRUMENTS}
          selected={profileData?.instrument ?? ""}
          onSelect={(value) =>
            setProfileData({ ...profileData, instrument: value })
          }
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
