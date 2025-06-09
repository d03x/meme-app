import { Pressable } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: any;
}

const IconButton = ({
  icon,
  size = 28,
  color = "#333",
  onPress,
  style,
}: IconButtonProps) => {
  const pressProgress = useSharedValue(0);
  const longPressProgress = useSharedValue(0);

  const handlePressIn = () => {
    pressProgress.value = withSpring(1, {
      damping: 10,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    pressProgress.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
    longPressProgress.value = withTiming(0, {
      duration: 200,
    });
  };

  const handleLongPress = () => {
    longPressProgress.value = withSpring(1, {
      damping: 5,
      stiffness: 100,
    });
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(pressProgress.value, [0, 1], [1, 0.85]),
        },
      ],
      backgroundColor: interpolateColor(
        pressProgress.value,
        [0, 1],
        ["transparent", "rgba(0, 0, 0, 0.1)"]
      ),
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(pressProgress.value, [0, 1], [1, 0.9]),
        },
        {
          rotate: `${interpolate(longPressProgress.value, [0, 1], [0, 10])}deg`,
        },
      ],
      opacity: interpolate(longPressProgress.value, [0, 1], [1, 0.7]),
    };
  });

  const animatedRippleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(pressProgress.value, [0, 1], [0.5, 1.5]),
        },
      ],
      opacity: interpolate(pressProgress.value, [0, 1], [0, 0.3]),
      backgroundColor: color,
    };
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      onPress={onPress}
      delayLongPress={300}
      style={[{ position: "relative" }, style]}
    >
      <Animated.View
        style={[
          {
            aspectRatio:1/1,
            width: size*1.50,
            borderRadius: size * 1.75,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          },
          animatedContainerStyle,
        ]}
      >
        {/* Ripple effect */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: size * 1.75,
              height: size * 1.75,
              borderRadius: size * 1.75,
            },
            animatedRippleStyle,
          ]}
        />

        {/* Icon */}
        <Animated.View style={animatedIconStyle}>
          {icon || <Ionicons name="star" size={size} color={color} />}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default memo(IconButton);
