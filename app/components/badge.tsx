import { Text } from "react-native";

interface Props {
  text: string;
}

export function Badge(props: Props) {
  return (
    <Text className="bg-[#422b2b] text-[#fc766a] items-center rounded px-2 py-1 text-xs">
      {props.text}
    </Text>
  );
}
