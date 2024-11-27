import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props {
  className?: string;
  type: "info" | "warning" | "error" | "success";
  text: string;
}

export function Alert(props: Props) {
  let className = "flex flex-row items-center rounded-xl p-2 ";
  if (props.type === "error") className += "bg-error text-error";
  if (props.type === "warning") className += "bg-warning text-warning";
  if (props.type === "info") className += "bg-info text-info";
  if (props.type === "success") className += "bg-success text-success";
  if (props.className) className += ` ${props.className}`;

  let iconName = "alert-circle-outline";
  if (props.type === "error") iconName = "close-circle-outline";

  return (
    <View className={className}>
      <Ionicons className="mr-2" name={iconName as any} size={24} />
      <Text className="leading-normal">{props.text}</Text>
    </View>
  );
}
