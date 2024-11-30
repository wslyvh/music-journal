import { PropsWithChildren } from "react";
import { View, ScrollView } from "react-native";
import { ActiveTimer } from "./active-timer";
import { Text } from "@/components/text";

interface Props extends PropsWithChildren {
  title: string;
  className?: string;
  scrollable?: boolean;
}

export function ScreenLayout(props: Props) {
  let containerClassName = "flex flex-1 bg-base-100";
  let contentClassName = "p-4";
  if (props.className) contentClassName += ` ${props.className}`;

  const Content = (
    <>
      <Text className="text-xl text-base-content font-bold my-4">
        {props.title}
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
