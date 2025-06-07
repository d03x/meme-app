import { PRIMARY_COLOR, PRIMARY_COLOR_2 } from "@/utils/colors";
import { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  NavigationState,
  SceneRendererProps,
  TabDescriptor,
} from "react-native-tab-view";

const SceneTab = (
  tabs: SceneRendererProps &
    SceneRendererProps & {
      navigationState: NavigationState<any>;
      options: Record<string, TabDescriptor<any>> | undefined;
    }
) => {
  const [layouts, setLayouts] = useState<{ x: number; width: number }[]>(
    tabs.navigationState.routes.map(() => ({ x: 0, width: 0 }))
  );
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const isInitalized = useRef(false);
  useEffect(() => {
    const { x, width } = layouts[tabs.navigationState.index] || {
      x: 0,
      width: 0,
    };
    indicatorX.value = isInitalized.current
      ? withTiming(x, { duration: 250 })
      : x;
    indicatorWidth.value = isInitalized.current
      ? withTiming(width, { duration: 250 })
      : width;
    isInitalized.current = true;
  }, [layouts, tabs.navigationState]);

  const animatedIndicator = useAnimatedStyle(() => {
    return {
      width: indicatorWidth.value,
      transform: [
        {
          translateX: indicatorX.value,
        },
      ],
    };
  });

  const onLayoutHandle = (index: number) => (e: LayoutChangeEvent) => {
    const { width, x } = e.nativeEvent.layout;
    setLayouts((old) => {
      const next = [...old];
      next[index] = { x: x, width: width };
      return next;
    });
  };
  return (
    <View
      style={{
        position: "relative",
        backgroundColor: "white",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#dedede",
        height: 40,
      }}
    >
      <Animated.View
        style={[
          animatedIndicator,
          {
            height: "100%",
            position: "absolute",
            backgroundColor: PRIMARY_COLOR_2,
            borderBottomColor: PRIMARY_COLOR,
            bottom: 0,
            borderBottomWidth: 2,
          },
        ]}
      />

      {tabs.navigationState.routes.map((e, index) => {
        const active = index == tabs.navigationState.index;
        return (
          <Pressable
            key={index}
            onLayout={onLayoutHandle(index)}
            style={{
              height: "100%",
              justifyContent: "center",
              flex: 1,
              alignItems: "center",
            }}
            onPress={() => {
              tabs.jumpTo(e.key);
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: active ? "bold" : "500" }}>
              {e.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
export default SceneTab;
