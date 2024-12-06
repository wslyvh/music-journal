import { PropsWithChildren } from "react";
import { View, ScrollView } from "react-native";
import { ActiveTimer } from "./active-timer";
import { Text } from "@/components/text";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Props extends PropsWithChildren {
  title: string;
  goBack?: boolean;
  className?: string;
  scrollable?: boolean;
}

export function ScreenLayout(props: Props) {
  let containerClassName = "flex flex-1 bg-base-100 flex-1 pb-20";
  let contentClassName = "p-4";
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

  return (
    <View className={containerClassName}>
      {props.scrollable !== false ? (
        <ScrollView className={contentClassName}>{Content}</ScrollView>
      ) : (
        <View className={contentClassName}>{Content}</View>
      )}
    </View>
  );
}
