import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  text: string;
}

export function Button(props: Props) {
  return (
    <TouchableOpacity
      className="bg-primary items-center rounded-md px-4 py-2"
      {...props}
    >
      <Text className="text-primary-content font-bold">{props.text}</Text>
    </TouchableOpacity>
  );
}
