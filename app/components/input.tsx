import { memo, useState, useEffect } from "react";
import { TextInput, TextInputProps } from "react-native";
import { THEME_COLORS } from "@/utils/theme";

interface Props extends TextInputProps {
  text?: string;
}

export const Input = memo(function Input(props: Props) {
  const [internalValue, setInternalValue] = useState(props.value);
  let { className: _, value, onChangeText, ...rest } = props;

  let className = "bg-base-300 rounded-md px-4 py-3";
  if (!internalValue) className += " text-muted";
  if (internalValue) className += " text-base-content";
  if (props.className) className += ` ${props.className}`;

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChangeText = (text: string) => {
    setInternalValue(text);
    onChangeText?.(text);
  };

  return (
    <TextInput
      className={className}
      placeholderTextColor={THEME_COLORS.muted}
      value={internalValue}
      onChangeText={handleChangeText}
      {...rest}
    />
  );
});
