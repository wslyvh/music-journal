import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { useProfile } from "@/hooks/profile/useProfile";
import dayjs from "dayjs";

export function AccountBanner() {
  const { data: profile } = useProfile();

  if (profile) {
    return (
      <View className="flex flex-row items-center bg-base-200 rounded-xl p-8 gap-4">
        <View className="bg-primary w-12 h-12 rounded-full flex items-center justify-center">
          <Ionicons name="person-outline" size={24} color="white" />
        </View>
        <View className="flex gap-1">
          <Text className="text-xl font-bold text-base-content">
            {profile.username}
          </Text>
          <Text className="flex text-base-content items-center gap-1">
            {dayjs.unix(profile.createdAt).format("MMM DD, YYYY")}{" "}
            <Badge text="early adopter" />
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Join description="Register to record, track your progress and manage your profile." />
  );
}

interface JoinProps {
  title?: string;
  description?: string;
  className?: string;
}

export function Join(props: JoinProps) {
  let className = "flex bg-base-200 rounded-xl p-8 gap-2";
  if (props.className) className += ` ${props.className}`;

  return (
    <View className={className}>
      <Text className="text-2xl font-bold text-base-content">
        {props.title ?? "Join the community"}
      </Text>
      <Text className="mb-2 text-base-content leading-loose">
        {props.description ??
          "Register to stay motivated! Record, reflect, and improve your musical journey together with the community."}
      </Text>

      <Button text="Register" onPress={() => router.push("/onboarding")} />
    </View>
  );
}
