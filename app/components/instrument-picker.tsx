import { useInstrument } from "@/hooks/useInstrument";
import { View } from "react-native";
import { Text } from "@/components/text";
interface Props {
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}
export function InstrumentPicker(props: Props) {
  const instrument = useInstrument();

  let className = "flex";
  if (props.className) className += ` ${props.className}`;

  return (
    <View className={className}>
      <Text>Instrument Picker: {instrument}</Text>
    </View>
  );
}
