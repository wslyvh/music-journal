import { Text, View } from "react-native";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

export function Loading(props: Props) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const sequence = [".", "..", "..."];
    let index = 0;

    const interval = setInterval(() => {
      setDots(sequence[index]);
      index = (index + 1) % sequence.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text className={`text-2xl text-muted ${props.className}`}>{dots}</Text>
  );
}

export function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-base-100">
      <Loading />
    </View>
  );
}
