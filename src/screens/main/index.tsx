import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeTab from "@/screens/main/HomeScreen";
import { AccountScreenTab } from "@/screens/main/Account";
import PostTab from "@/screens/main/PostScreen";
const Tab = createBottomTabNavigator();
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
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
import { AppScreens } from "@/navigation/AppNavigation/AppScreens";

const homeTab = [
  {
    name: AppScreens.HOME_SCREEN,
    title: "Home",
    component: HomeTab,
  },
  {
    name: AppScreens.ABOUT_SCREEN,
    component: About,
    title: "Buat",
  },
  {
    name: AppScreens.POST_SCREEN,
    component: PostTab,
    title: "Explore",
  },
  {
    name: AppScreens.ACCOUNT_SCREEN,
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
        case AppScreens.HOME_SCREEN:
          return (
            <AntDesign
              size={24}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="home"
            />
          );
          break;
        case AppScreens.ABOUT_SCREEN:
          return (
            <Feather
              size={20}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="plus-circle"
            />
          );
          break;
        case AppScreens.ACCOUNT_SCREEN:
          return (
            <Feather
              size={24}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="user"
            />
          );
          break;
        case AppScreens.POST_SCREEN:
          return (
            <Feather
              size={20}
              color={isActive ? PRIMARY_COLOR : "gray"}
              name="compass"
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
      <StatusBar translucent={true} style="light" />
      <Tab.Navigator
        tabBar={(props) => (
          <BottomTabBar {...props} renderIcon={renderIconTab} />
        )}
        screenOptions={{
          headerShown: false,
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
