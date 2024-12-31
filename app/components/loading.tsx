import { Text } from "@/components/text";

interface Props {
  className?: string;
}

export function Loading(props: Props) {
  return <Text className={props.className}>Loading...</Text>;
}
