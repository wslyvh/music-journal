import { THEME_COLORS } from "@/utils/theme";
import { Picker } from "@react-native-picker/picker";

interface Props {
  selected: string;
  items: string[];
  onSelect: (value: string) => void;
  className?: string;
}

export function InstrumentPicker(props: Props) {
  let { className: _, ...rest } = props;
  let className =
    "bg-base-300 text-base-content rounded-md px-3 py-3 overflow-hidden";

  if (props.className) className += ` ${props.className}`;

  return (
    <Picker
      selectedValue={props.selected}
      onValueChange={props.onSelect}
      className={className}
      dropdownIconColor={THEME_COLORS["base-content"]}
      style={{
        backgroundColor: THEME_COLORS["base-300"],
        color: THEME_COLORS["base-content"],
      }}
      {...rest}
    >
      {props.items.map((instrument: string) => (
        <Picker.Item key={instrument} label={instrument} value={instrument} />
      ))}
    </Picker>
  );
}
