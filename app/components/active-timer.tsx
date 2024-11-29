import { useRecorder } from "@/context/recording";
import { formatTime } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Link, router, useRouter } from "expo-router";
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
        <View className="flex-row gap-2">
          {recorder.state === "RUNNING" && (
            <Ionicons
              onPress={() => recorder.pause()}
              className="color-primary"
              name="pause"
              size={18}
            />
          )}
          {recorder.state === "PAUSED" && (
            <Ionicons
              onPress={() => recorder.resume()}
              className="color-primary"
              name="play"
              size={18}
            />
          )}

          <Ionicons
            onPress={() => {
              recorder.stop();
              router.navigate("/start");
            }}
            className="color-primary"
            name="stop"
            size={18}
          />
        </View>
      </View>
    );
  }

  return null;
}
