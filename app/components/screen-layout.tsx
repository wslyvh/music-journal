import { PropsWithChildren } from "react";
import { View, ScrollView, Platform, RefreshControl } from "react-native";
import { useState } from "react";
import { ActiveTimer } from "./active-timer";
import { Text } from "@/components/text";
import { router, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLORS } from "@/utils/theme";

interface Props extends PropsWithChildren {
  title: string;
  goBack?: boolean;
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
      <Text className="flex flex-row text-xl text-base-content font-bold items-center my-4">
        {props.goBack && (
          <Ionicons
            name="arrow-back"
            size={24}
            onPress={() => router.back()}
            className="mr-4 cursor-pointer text-base-content"
          />
        )}
        <Text>{props.title}</Text>
      </Text>
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
