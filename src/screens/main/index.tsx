import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeTab from "@/screens/main/HomeScreen";
import { AccountScreenTab } from "@/screens/main/Account";
import PostTab from "@/screens/main/PostScreen";
const Tab = createBottomTabNavigator();
import { AntDesign, Feather } from "@expo/vector-icons";
import About from "@/screens/AboutScreen";
import React, { memo, useCallback } from "react";
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
import BottomTabBar from "@/components/BottomTabBar";
import { RoutesEnum } from "@/lib/types/Routes";

const homeTab = [
  {
    name: RoutesEnum.HOME,
    title: "Home",
    component: HomeTab,
  },
  {
    name: RoutesEnum.ABOUT,
    component: About,
    title: "Buat",
  },
  {
    name: RoutesEnum.POST_TAB,
    component: PostTab,
    title: "Notifikasi",
  },
  {
    name: RoutesEnum.ACCOUNT_TAB,
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

export default function HomeTabNavigation() {
  const renderIconTab = useCallback(
    (key: string, isActive: boolean = false) => {
      switch (key) {
        case RoutesEnum.HOME:
          return (
            <AntDesign
              size={24}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="home"
            />
          );
          break;
        case RoutesEnum.ABOUT:
          return (
            <Feather
              size={20}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="plus-circle"
            />
          );
          break;
        case RoutesEnum.ACCOUNT_TAB:
          return (
            <Feather
              size={24}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="user"
            />
          );
          break;
        case RoutesEnum.POST_TAB:
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
        tabBar={(props) => (
          <BottomTabBar {...props} renderIcon={renderIconTab} />
        )}
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
