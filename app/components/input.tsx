import { THEME_COLORS } from "@/utils/theme";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  text?: string;
}

export function Input(props: Props) {
  let { className: _, ...rest } = props;
  let className = "bg-base-300 rounded-md px-4 py-3";
  if (!props.value) className += " text-muted";
  if (props.value) className += " text-base-content";
  if (props.className) className += ` ${props.className}`;

  return (
    <TextInput
      className={className}
      placeholderTextColor={THEME_COLORS.muted}
      {...rest}
    />
  );
}
