import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { formatDate } from "@/utils/format";

export function AccountBanner() {
  const { account } = useAuth();

  if (account) {
    return (
      <View className="flex flex-row items-center bg-base-200 rounded-xl p-8 gap-4">
        <View className="bg-primary w-12 h-12 rounded-full flex items-center justify-center">
          <Ionicons name="person-outline" size={24} color="white" />
        </View>
        <View className="flex gap-1">
          <Text className="text-xl font-bold text-base-content">
            {account.email}
          </Text>
          <Text className="flex text-base-content items-center gap-1">
            {formatDate(account.createdAt)} <Badge text="early adopter" />
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View className="flex bg-base-200 rounded-xl p-8 gap-2">
      <Text className="text-xl font-bold text-base-content">
        Join the community
      </Text>
      <Text className="mb-2 text-base-content">
        Register to stay motivated! Record, reflect, and improve your musical
        journey with our community.
      </Text>

      <Button text="Register" onPress={() => router.push("/login")} />
    </View>
  );
}
