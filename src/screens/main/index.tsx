import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeTab from "@/screens/main/HomeScreen";
import { AccountScreenTab } from "@/screens/main/Account";
import PostTab from "@/screens/main/PostScreen";
const Tab = createBottomTabNavigator();
import {
  AntDesign,
  Feather,

} from "@expo/vector-icons";
import About from "@/screens/AboutScreen";
import React, { memo, useCallback, } from "react";
import { Pressable, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { HeaderBackButtonProps } from "@react-navigation/elements";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Text } from "@/components/Typography";
import { PRIMARY_COLOR } from "@/utils/colors";

enum Routes {
  HOME = "home",
  ABOUT = "about",
  PRESENSI = "presensi",
  POST_TAB = "post-tab",
  ACCOUNT_TAB = "account-tab",
}

const homeTab = [
  {
    name: Routes.HOME,
    title: "Home",
    component: HomeTab,
  },
  {
    name: Routes.ABOUT,
    component: About,
    title: "Buat",
  },
  {
    name: Routes.POST_TAB,
    component: PostTab,
    title: "Notifikasi",
  },
  {
    name: Routes.ACCOUNT_TAB,
    component: AccountScreenTab,
    title: "Akun",
  },
];

export const LeftHeaderContent = memo(function TabHeaderLeft(
  props: Omit<HeaderBackButtonProps, "children">
) {
  return (
    <View style={{ marginLeft: 5 }}>
      <Image
        style={{
          width: 90,
          height: 23,
        }}
        source={{
          uri: "https://cache.lahelu.com/permanent/logo-256.png",
        }}
      />
    </View>
  );
});
const TAB_BAR_HEIGHT = 60;
const TabBar = memo(
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
                  type={isFocused ? "ExtraBold" : "Thin"}
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

export default function HomeTabNavigation() {
  const renderIconTab = useCallback(
    (key: string, isActive: boolean = false) => {
      switch (key) {
        case Routes.HOME:
          return (
            <AntDesign
              size={24}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="home"
            />
          );
          break;
        case Routes.ABOUT:
          return (
            <Feather
              size={20}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="plus-circle"
            />
          );
          break;
        case Routes.ACCOUNT_TAB:
          return (
            <Feather
              size={24}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="user"
            />
          );
          break;
        case Routes.POST_TAB:
          return (
            <Feather
              size={20}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="bell"
            />
          );

          break;
        default:
          break;
      }
    },
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={false} style="auto" />
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} renderIcon={renderIconTab} />}
        screenOptions={{
          headerTitle(props) {
            return null;
          },
          headerLeft: (props) => <LeftHeaderContent {...props} />,
        }}
        id={null}
      >
        {homeTab.map((item, index) => {
          return (
            <Tab.Screen
              options={{
                headerStyle: {
                  elevation: 1,
                },
                title: item.title,
              }}
              key={index}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
}
