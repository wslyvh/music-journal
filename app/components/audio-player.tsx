import { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Text } from "./text";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatTime } from "@/utils/format";
import { THEME_COLORS } from "@/utils/theme";
import Slider from "@react-native-community/slider";

interface Props {
  url: string;
  className?: string;
}

export function AudioPlayer({ url, className }: Props) {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setupAudio();
    return () => {
      if (sound) {
        sound
          .pauseAsync()
          .then(() => sound.unloadAsync())
          .catch((error) => console.error("Error cleaning up sound:", error));
      }
    };
  }, [url]);

  async function setupAudio() {
    try {
      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: url },
        { progressUpdateIntervalMillis: 100 },
        onPlaybackStatusUpdate
      );
      setSound(audioSound);
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  }

  function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (!status.isLoaded) return;

    setPosition(status.positionMillis);
    setDuration(status.durationMillis ?? 0);
    setIsPlaying(status.isPlaying);

    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  }

  async function handlePlayPause() {
    if (!sound) return;

    try {
      const status = await sound.getStatusAsync();
      if (!status.isLoaded) return;

      if (isPlaying) {
        await sound.pauseAsync();
        return;
      }

      if (status.positionMillis === status.durationMillis) {
        await sound.setPositionAsync(0);
      }
      await sound.playAsync();
    } catch (error) {
      console.error("Error in playPause:", error);
    }
  }

  async function handleSeek(value: number) {
    if (!sound) return;
    await sound.setPositionAsync(value);
  }

  async function skipForward() {
    if (!sound) return;
    const newPosition = Math.min(position + 10000, duration);
    await sound.setPositionAsync(newPosition);
  }

  async function skipBackward() {
    if (!sound) return;
    const newPosition = Math.max(position - 10000, 0);
    await sound.setPositionAsync(newPosition);
  }

  return (
    <View className={`bg-base-200 rounded-lg p-4 ${className}`}>
      <View className="flex-row justify-between mb-2">
        <Text className="text-base-content">
          {formatTime(Math.floor(position / 1000))}
        </Text>
        <Text className="text-base-content">
          {formatTime(Math.floor(duration / 1000))}
        </Text>
      </View>

      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration || 1}
        onSlidingComplete={handleSeek}
        minimumTrackTintColor={THEME_COLORS.primary}
        maximumTrackTintColor={THEME_COLORS.muted}
        thumbTintColor={THEME_COLORS.primary}
        style={{ height: 40 }}
      />

      <View className="flex-row items-center justify-center gap-4 mt-2">
        <TouchableOpacity
          onPress={skipBackward}
          className="w-12 h-12 items-center justify-center"
        >
          <MaterialIcons
            name="replay-10"
            size={28}
            color={THEME_COLORS["base-content"]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePlayPause}
          className="w-12 h-12 bg-primary rounded-full items-center justify-center"
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color={THEME_COLORS["primary-content"]}
            style={{ marginLeft: isPlaying ? 0 : 2 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={skipForward}
          className="w-12 h-12 items-center justify-center"
        >
          <MaterialIcons
            name="forward-10"
            size={28}
            color={THEME_COLORS["base-content"]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
