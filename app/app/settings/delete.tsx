import { AccountBanner } from "@/components/account/banner";
import { ScreenLayout } from "@/components/screen-layout";
import { router } from "expo-router";
import { View } from "react-native";
import { Text } from "@/components/text";
import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfileDelete } from "@/hooks/profile/useProfileDelete";

export default function Settings() {
  const deleteProfile = useProfileDelete();
  const [confirmText, setConfirmText] = useState("");

  return (
    <ScreenLayout title="Delete Data" goBack>
      <AccountBanner />

      <View className="text-base-content">
        <Text className="mt-4">
          All your data is stored locally on your device. We do not collect any
          data from your device. If you want to delete your data, you can do so
          by deleting the app.
        </Text>
        <Text className="mt-4">
          You can also clear your data to start fresh. This action cannot be
          undone and will remove all of your data immediately.
        </Text>
        <Text className="flex flex-row gap-2 mt-4">
          Write{" "}
          <Text className="font-bold text-destructive text-primary">
            sudo delete
          </Text>{" "}
          to confirm.
        </Text>
      </View>

      <View className="mt-4">
        <Input
          placeholder="sudo delete"
          value={confirmText}
          onChangeText={setConfirmText}
        />
      </View>

      <View className="flex flex-col justify-center space-between mt-8 gap-4">
        <Button
          onPress={() => router.push("/settings")}
          text="Cancel"
          type="neutral"
        />
        <Button
          onPress={async () => {
            if (confirmText === "sudo delete") {
              deleteProfile.mutate(undefined);
            }
          }}
          text="Delete Account"
          type="primary"
        />
      </View>
    </ScreenLayout>
  );
}
