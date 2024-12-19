import { useRecorder } from "@/context/recording";
import { formatTime } from "@/utils/format";
import { THEME_COLORS } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Link, router } from "expo-router";
import { View } from "react-native";

interface Props {
  className?: string;
}

export function ActiveTimer(props: Props) {
  const route = useRoute();
  const recorder = useRecorder();

  let className =
    "flex flex-row items-center justify-between rounded-xl border border-1 border-primary bg-[#2b2124] text-primary p-4 mb-4";
  if (props.className) className += ` ${props.className}`;

  if (route.name === "start") return null;

  if (recorder.state === "RUNNING" || recorder.state === "PAUSED") {
    return (
      <View className={className}>
        <Link href="/start" className="text-primary font-bold">
          Recording {formatTime(recorder.timer)}
        </Link>
        <View className="flex-row gap-4">
          {recorder.state === "RUNNING" && (
            <Ionicons
              onPress={() => recorder.pause()}
              name="pause"
              size={21}
              color={THEME_COLORS["primary"]}
            />
          )}
          {recorder.state === "PAUSED" && (
            <Ionicons
              onPress={() => recorder.resume()}
              name="play"
              size={21}
              color={THEME_COLORS["primary"]}
            />
          )}

          <Ionicons
            onPress={() => {
              recorder.stop();
              router.navigate("/start");
            }}
            name="stop"
            size={21}
            color={THEME_COLORS["primary"]}
          />
        </View>
      </View>
    );
  }

  return null;
}
