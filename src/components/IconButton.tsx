import { View } from "react-native";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const IconButton = ({ icon }: any) => {
  const bg = useSharedValue(1);

  const onPresIn = () => {
    bg.value = withTiming(1, { duration: 240 });
  };
  const onPressOut = () => {
    bg.value = withTiming(0, { duration: 240 });
  };

  const bgButton = useAnimatedStyle(() => {
    return {
      padding: 2,
      transform: [
        {
          scale: interpolate(bg.value, [0, 1], [0.9, 1], "clamp"),
        },
      ],
      backgroundColor: interpolateColor(
        bg.value,
        [0, 1],
        ["rgba(0, 0, 0, 0.3)", "transparent"]
      ),
    };
  });

  return (
    <Animated.View
      style={[
        bgButton,
        {
          borderRadius: 100,
        },
      ]}
    >
      <Pressable onPressIn={onPressOut} onPressOut={onPresIn}>
        {icon}
      </Pressable>
    </Animated.View>
  );
};
export default IconButton;
