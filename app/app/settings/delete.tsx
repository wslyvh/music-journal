import { AccountBanner } from "@/components/account/banner";
import { ScreenLayout } from "@/components/screen-layout";
import { router } from "expo-router";
import { View } from "react-native";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function Settings() {
  const { deleteMutation } = useAuth();
  const [confirmText, setConfirmText] = useState("");

  return (
    <ScreenLayout title="Delete Account">
      <AccountBanner />

      <View className="text-base-content">
        <Text className="mt-4">
          Are you sure you want to delete your account? This action cannot be
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
              deleteMutation.mutate(undefined, {
                onSuccess: () => router.push("/"),
              });
            }
          }}
          text="Delete Account"
          type="primary"
        />
      </View>
    </ScreenLayout>
  );
}
