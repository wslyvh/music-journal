import { useInstrument } from "@/hooks/useInstrument";
import { View } from "react-native";

interface Props {
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}
export function InstrumentPicker(props: Props) {
  const instrument = useInstrument();

  let className = "flex";
  if (props.className) className += ` ${props.className}`;

  {
    /* // TODO: Select Instruments dropdown */
  }
  return <View className={className}>Instrument Picker: {instrument}</View>;
}
