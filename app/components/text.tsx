import { Text as RNText, TextProps } from "react-native";

interface Props extends TextProps {
  className?: string;
}

export function Text(props: Props) {
  let { className: _, ...rest } = props;
  let className = "text-base-content";
  if (props.className) className += ` ${props.className}`;

  return (
    <RNText className={className} {...rest}>
      {props.children}
    </RNText>
  );
}
