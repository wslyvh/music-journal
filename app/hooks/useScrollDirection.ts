import { useState, useRef } from "react";
import { Animated } from "react-native";

let isScrollingDown = false;
const globalTranslateY = new Animated.Value(0);

export function useScrollDirection() {
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const currentScrollY = nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY;

    if (!isScrollingDown && diff > 20) {
      isScrollingDown = true;
      Animated.spring(globalTranslateY, {
        toValue: 100,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else if (isScrollingDown && diff < -20) {
      isScrollingDown = false;
      Animated.spring(globalTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }

    setLastScrollY(currentScrollY);
  };

  return { translateY: globalTranslateY, handleScroll };
}
