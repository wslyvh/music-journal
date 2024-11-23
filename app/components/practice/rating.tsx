import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { View } from "react-native";

interface Props {
  score: number;
  size?: number;
  className?: string;
  onScore: (value: number) => void;
}

export function StarRating(props: Props) {
  let className = "flex-row justify-center space-x-2";
  if (props.className) {
    className += ` ${props.className}`;
  }

  return (
    <View className={className}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Pressable
          key={value}
          onPress={() => props.onScore(value === props.score ? 0 : value)}
          className="p-2"
        >
          <Ionicons
            name="star"
            size={props.size || 24}
            color={value <= props.score ? "#FFD700" : "#D3D3D3"}
          />
        </Pressable>
      ))}
    </View>
  );
}
