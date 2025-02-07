import { memo, useState, useEffect } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { THEME_COLORS } from "@/utils/theme";

interface Props extends TextInputProps {
  text?: string;
  showClear?: boolean;
}

export const Input = memo(function Input(props: Props) {
  const [internalValue, setInternalValue] = useState(props.value);
  let { className: _, value, onChangeText, showClear = false, ...rest } = props;

  let className = "bg-base-300 rounded-md px-4 py-3";
  if (!internalValue) className += " text-muted";
  if (internalValue) className += " text-base-content";
  if (showClear) className += " pr-10";
  if (props.className) className += ` ${props.className}`;

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChangeText = (text: string) => {
    setInternalValue(text);
    onChangeText?.(text);
  };

  const handleClear = () => {
    handleChangeText("");
  };

  return (
    <View className="relative">
      <TextInput
        className={className}
        placeholderTextColor={THEME_COLORS.muted}
        value={internalValue}
        onChangeText={handleChangeText}
        {...rest}
      />
      {showClear && internalValue && (
        <TouchableOpacity
          className="absolute right-0 text-muted px-4 py-2"
          onPress={handleClear}
        >
          ×
        </TouchableOpacity>
      )}
    </View>
  );
});
