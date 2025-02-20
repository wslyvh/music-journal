import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  type?: "primary" | "neutral" | "secondary" | "outline";
  text: string;
  disabled?: boolean;
}

export function Button(props: Props) {
  let { className: _, ...rest } = props;
  let className = "items-center rounded-md min-h-12 justify-center px-6 py-3";
  let textClassName = "font-bold";

  if (props.type === "primary" || !props.type) {
    className += " bg-primary";
    textClassName += " text-primary-content";
  }
  if (props.type === "neutral") {
    className += " bg-neutral";
    textClassName += " text-primary-content";
  }
  if (props.type === "secondary") {
    className += " bg-secondary";
    textClassName += " text-primary-content";
  }
  if (props.type === "outline") {
    className += " bg-transparent border border-primary";
    textClassName += " text-primary";
  }
  if (props.disabled) {
    className += " opacity-50";
  }
  if (props.className) className += ` ${props.className}`;

  return (
    <TouchableOpacity className={className} {...rest}>
      <Text className={textClassName}>{props.text}</Text>
    </TouchableOpacity>
  );
}
