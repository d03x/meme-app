import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeTab from "@/screens/main/HomeScreen";
import { AccountScreenTab } from "@/screens/main/Account";
import PostTab from "@/screens/main/PostScreen";
const Tab = createBottomTabNavigator();
import { Ionicons } from "@expo/vector-icons";
import About from "@/screens/AboutScreen";
import React, { memo, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { HeaderBackButtonProps } from "@react-navigation/elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../HomeScreen";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const homeTab = [
  {
    name: "home",
    title: "Home",
    component: HomeTab,
    icon: <Ionicons size={24} name="home-outline" />,
  },
  {
    name: "about",
    component: About,
    title: "Presensi",
    icon: <Ionicons size={24} name="information-circle-outline" />,
  },
  {
    name: "post-tab",
    component: PostTab,
    title: "History",
    icon: <Ionicons size={24} name="push-outline" />,
  },
  {
    name: "account-tab",
    component: AccountScreenTab,
    title: "Akun",
    icon: <Ionicons size={24} name="person-circle-outline" />,
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
const TabBar = memo(({ navigation, descriptors, state }: BottomTabBarProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: TAB_BAR_HEIGHT,
        borderTopWidth:2,
        borderTopColor:"#eaeaea"
      }}
    >
      {state.routes.map((e, index) => {
        const background = useSharedValue(1);
        const { route } = descriptors[e.key];
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
                scale: interpolate(background.value, [0, 1], [0.9, 1], "clamp"),
              },
            ],
          };
        });

        return (
          <Animated.View style={[useAnimate, { flex: 1 }]} key={index}>
            <Pressable
              style={[
                {
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
              <Text>{e.name}</Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
});

export default function HomeTabNavigation() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={false} style="auto" />
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
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
                tabBarIcon() {
                  return item.icon;
                },
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
