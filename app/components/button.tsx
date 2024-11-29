import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  type?: "primary" | "neutral" | "secondary";
  text: string;
}

export function Button(props: Props) {
  let { className: _, ...rest } = props;
  let className = "items-center rounded-md px-6 py-3";
  if (props.type === "primary" || !props.type) className += " bg-primary";
  if (props.type === "neutral") className += " bg-neutral";
  if (props.type === "secondary") className += " bg-secondary";
  if (props.className) className += ` ${props.className}`;

  return (
    <TouchableOpacity className={className} {...rest}>
      <Text className="text-primary-content font-bold">{props.text}</Text>
    </TouchableOpacity>
  );
}
