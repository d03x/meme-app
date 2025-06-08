import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import React, { memo } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Text } from "@/components/Typography";
import { PRIMARY_COLOR } from "@/utils/colors";

const TAB_BAR_HEIGHT = 60;
const BottomTabBar = memo(
  ({
    navigation,
    renderIcon,
    descriptors,
    state,
  }: BottomTabBarProps & {
    renderIcon: (key: string, active: boolean) => any;
  }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: TAB_BAR_HEIGHT,
          borderTopWidth: 2,
          borderTopColor: "#eaeaea",
        }}
      >
        {state.routes.map((e, index) => {
          const background = useSharedValue(1);
          const { route, options } = descriptors[e.key];
          const isFocused = index === state.index;
          const onFadeIn = () => {
            background.value = withTiming(1, {
              duration: 200,
            });
          };
          const onFadeOut = () => {
            background.value = 0;
          };
          const onLongPress = () => {
            navigation.emit({
              target: route.key,
              type: "tabLongPress",
            });
          };
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          const title: string = (
            options.title != null
              ? options.title
              : options.headerTitle != null
              ? options.headerTitle
              : route.name
          ) as string;
          const useAnimate = useAnimatedStyle(() => {
            return {
              backgroundColor: interpolateColor(
                background.value,
                [0, 1],
                ["rgba(0, 0, 0, 0.1)", "transparent"]
              ),
              opacity: interpolate(background.value, [0, 1], [0.7, 1], "clamp"),
              transform: [
                {
                  scale: interpolate(
                    background.value,
                    [0, 1],
                    [0.9, 1],
                    "clamp"
                  ),
                },
              ],
            };
          });
          let defaultIcon;
          if (typeof options.tabBarIcon != "undefined") {
            defaultIcon = options.tabBarIcon({
              focused: isFocused,
              color: "black",
              size: 24,
            });
          }

          return (
            <Animated.View style={[useAnimate, { flex: 1 }]} key={index}>
              <Pressable
                style={[
                  {
                    overflow: "hidden",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
                onPressOut={onFadeIn}
                onPressIn={onFadeOut}
                onLongPress={onLongPress}
                onPress={onPress}
              >
                {!defaultIcon ? renderIcon(route.name, isFocused) : defaultIcon}
                <Text
                  color={isFocused ? PRIMARY_COLOR : "black"}
                  type={isFocused ? "Medium" : "Thin"}
                  size={12}
                >
                  {title}
                </Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    );
  }
);
export default BottomTabBar;
