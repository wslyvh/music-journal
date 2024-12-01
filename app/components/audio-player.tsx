import { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Text } from "./text";
import { Ionicons } from "@expo/vector-icons";
import { formatTime } from "@/utils/format";

interface Props {
  url: string;
  className?: string;
}

export function AudioPlayer({ url, className }: Props) {
  const containerClassName = `flex-row items-center space-x-4 bg-base-200 rounded-lg p-4 ${className}`;
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function loadSound() {
    console.log("Loading Sound");
    try {
      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: url },
        { progressUpdateIntervalMillis: 1000 },
        onPlaybackStatusUpdate
      );
      setSound(audioSound);
    } catch (error) {
      console.error("Error loading sound", error);
    }
  }

  function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (!status.isLoaded) return;

    setPosition(status.positionMillis ?? 0);
    setDuration(status.durationMillis ?? 0);
    setIsPlaying(status.isPlaying);
  }

  async function playPause() {
    try {
      if (!sound) {
        await loadSound();
        return;
      }

      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error playing/pausing", error);
    }
  }

  return (
    <View className={containerClassName}>
      <TouchableOpacity onPress={playPause}>
        <View className="w-8 h-8 items-center justify-center">
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            className="text-base-content"
          />
        </View>
      </TouchableOpacity>

      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="text-base-content">
            {formatTime(Math.floor(position / 1000))}
          </Text>
          <Text className="text-base-content">
            {formatTime(Math.floor(duration / 1000))}
          </Text>
        </View>

        <View className="h-1 bg-base-300 rounded-full mt-2">
          <View
            className="h-1 bg-primary rounded-full"
            style={{
              width: `${(position / duration) * 100}%`,
            }}
          />
        </View>
      </View>
    </View>
  );
}
