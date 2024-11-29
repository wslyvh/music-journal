import { AccountBanner } from "@/components/account/banner";
import { ScreenLayout } from "@/components/screen-layout";
import { router } from "expo-router";
import { View, TextInput } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Button } from "@/components/button";

export default function Settings() {
  const { deleteMutation } = useAuth();
  const [confirmText, setConfirmText] = useState("");

  return (
    <ScreenLayout title="Delete Account">
      <AccountBanner />

      <View className="text-base-content">
        <View className="mt-4">
          Are you sure you want to delete your account? This action cannot be
          undone and will remove all of your data immediately.
        </View>
        <View className="flex flex-row gap-2 mt-4">
          Write{" "}
          <View className="font-bold text-destructive text-primary">
            sudo delete
          </View>{" "}
          to confirm.
        </View>
      </View>

      <View className="mt-4">
        <TextInput
          className={`bg-base-200 text-base-content rounded-lg border-2 border-base-300 p-4 mt-4 ${
            confirmText ? "text-base-content" : "text-muted"
          }`}
          placeholder="sudo delete"
          value={confirmText}
          onChangeText={setConfirmText}
        />
      </View>

      <View className="flex-row space-between space-x-4 mt-8">
        <Button
          onPress={async () => {
            console.log("Delete Account");
            if (confirmText === "sudo delete") {
              deleteMutation.mutate({}, { onSuccess: () => router.push("/") });
            }
          }}
          text="Delete Account"
          type="primary"
          className="flex-1"
        />
        <Button
          onPress={() => router.push("/settings")}
          text="Cancel"
          type="neutral"
          className="flex-1"
        />
      </View>
    </ScreenLayout>
  );
}
