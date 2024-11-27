import { Button } from "@/components/button";
import { ScreenLayout } from "@/components/screen-layout";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Alert } from "@/components/alert";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/utils/token";
import { CONFIG } from "@/utils/config";

const id = "2";

export default function Index() {
  const { account } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["practice", id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return [];

      const res = await fetch(`${CONFIG.API_URL}/practice`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch sessions");

      const { data } = await res.json();
      return data;
    },
  });

  const [userError, setUserError] = useState("");

  async function handlePracticeUpdate() {
    console.log("Update Practice", id);
  }

  return (
    <ScreenLayout title="Hello 👋">
      <Text className="text-base-content">
        Please enter your email to continue. We will send you a 6-digit token to
        verify your email address.
      </Text>
      Edit Practice
    </ScreenLayout>
  );
}
