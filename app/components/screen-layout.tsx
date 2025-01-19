import { PropsWithChildren } from "react";
import {
  View,
  ScrollView,
  Platform,
  RefreshControl,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import { useState } from "react";
import { ActiveTimer } from "./active-timer";
import { Text } from "@/components/text";
import { router, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLORS } from "@/utils/theme";
import { Badge } from "./badge";
import { useRecorder } from "@/context/recording";

interface Props extends PropsWithChildren {
  title?: string;
  goBack?: boolean;
  backAction?: () => void;
  cancelable?: boolean;
  rightIcon?: {
    name: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  shareData?: {
    title?: string;
    message?: string;
    url?: string;
  };
  className?: string;
  scrollable?: boolean;
  onRefresh?: () => Promise<void>;
}

export function ScreenLayout(props: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const pathname = usePathname();

  let containerClassName = "flex-1 bg-base-100";
  let contentClassName = "flex-1 p-4 pb-20 mb-4";
  if (props.className) contentClassName += ` ${props.className}`;

  const Content = (
    <>
      <Header {...props} />
      <ActiveTimer />
      {props.children}
    </>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if (props.onRefresh) {
        await props.onRefresh();
      } else {
        router.replace(pathname as any);
      }
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View className={containerClassName}>
      {props.scrollable !== false ? (
        <ScrollView
          className={contentClassName}
          refreshControl={
            Platform.OS !== "web" ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={THEME_COLORS["primary"]}
                colors={[THEME_COLORS["primary"]]}
                progressBackgroundColor={THEME_COLORS["base-content"]}
                progressViewOffset={50}
              />
            ) : undefined
          }
        >
          {Content}
          {Platform.OS !== "web" && <View className="h-24" />}
        </ScrollView>
      ) : (
        <View className={contentClassName}>{Content}</View>
      )}
    </View>
  );
}

function Header(props: Props) {
  const recorder = useRecorder();

  const handleShare = async () => {
    if (!props.shareData) return;

    try {
      if (Platform.OS === "web") {
        const url = props.shareData.url || window.location.href;
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } else {
        const shareOptions = {
          title: props.shareData.title || props.title,
          message: props.shareData.message || "",
          url: props.shareData.url,
        };

        if (Platform.OS === "android" && props.shareData.url) {
          shareOptions.message = `${shareOptions.title}\n\n${shareOptions.message}\n\n${props.shareData.url}`;
        }

        await Share.share(shareOptions);
      }
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  const handleCancel = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to cancel?")) {
        recorder.clear();
        router.back();
      }
    } else {
      Alert.alert("Cancel", "Are you sure you want to cancel?", [
        { text: "No", style: "cancel" },
        { text: "Yes", style: "destructive", onPress: () => router.back() },
      ]);
    }
  };

  return (
    <View className="flex flex-row items-center justify-between h-16 mb-2">
      <View className="w-12 items-start">
        {props.goBack || props.backAction ? (
          <TouchableOpacity
            onPress={props.backAction || (() => router.back())}
            className="p-2 -ml-2"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={THEME_COLORS["base-content"]}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View className="flex-1 items-center">
        <Text
          className="text-xl font-bold text-base-content text-center"
          numberOfLines={1}
        >
          {props.title}
        </Text>
      </View>

      <View className="w-12 items-end">
        {props.cancelable && (
          <TouchableOpacity onPress={handleCancel} className="p-2 -mr-2">
            <Badge text="cancel" />
          </TouchableOpacity>
        )}
        {props.rightIcon ? (
          <TouchableOpacity
            onPress={props.rightIcon.onPress}
            className="p-2 -mr-2"
          >
            <Ionicons
              name={props.rightIcon.name}
              size={24}
              color={THEME_COLORS["base-content"]}
            />
          </TouchableOpacity>
        ) : (
          props.shareData && (
            <TouchableOpacity onPress={handleShare} className="p-2 -mr-2">
              <Ionicons
                name="share-outline"
                size={24}
                color={THEME_COLORS["base-content"]}
              />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}
