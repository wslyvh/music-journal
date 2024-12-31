import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { useAudioPermissions } from "@/hooks/usePermissions";
import { router } from "expo-router";
import { View } from "react-native";

interface Props {
  className?: string;
}

export function Permissions(props: Props) {
  const { data, isLoading, refetch } = useAudioPermissions();
  let className = "flex bg-base-200 rounded-xl p-8 gap-2";
  if (props.className) className += ` ${props.className}`;

  if (isLoading || !!data) return null;

  return (
    <View className={className}>
      <Text className="text-2xl font-bold text-base-content">
        Audio Permissions
      </Text>
      <Text className="mb-2 text-base-content leading-loose">
        We need to access your microphone to record your practice sessions.
      </Text>

      <Button text="Grant Permissions" onPress={() => refetch()} />
    </View>
  );
}
