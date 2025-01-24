import { THEME_COLORS } from "@/utils/theme";
import { useEffect, useMemo, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import debounce from "lodash/debounce";

interface Props extends TextInputProps {
  text?: string;
}

export function Input(props: Props) {
  const [localValue, setLocalValue] = useState(props.value);
  let { className: _, onChangeText, ...rest } = props;

  let className = "bg-base-300 rounded-md px-4 py-3";
  if (!localValue) className += " text-muted";
  if (localValue) className += " text-base-content";
  if (props.className) className += ` ${props.className}`;

  const debouncedCallback = useMemo(
    () =>
      debounce((text: string) => {
        if (onChangeText) {
          onChangeText(text);
        }
      }, 300),
    [onChangeText]
  );

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  useEffect(() => {
    setLocalValue(props.value);
  }, [props.value]);

  const handleChangeText = (text: string) => {
    setLocalValue(text);
    debouncedCallback(text);
  };

  return (
    <TextInput
      className={className}
      placeholderTextColor={THEME_COLORS.muted}
      value={localValue}
      onChangeText={handleChangeText}
      {...rest}
    />
  );
}
