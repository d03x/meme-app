import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "@/screens/main-home/home-tab";
import {AccountTab} from "@/screens/main-home/account";
import PostTab from "@/screens/main-home/post-tab";
const Tab = createBottomTabNavigator();
import { Ionicons } from "@expo/vector-icons";
import About from "@/screens/about-screen";
import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
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
    title: "About",
    icon: <Ionicons size={24} name="information-circle-outline" />,
  },
  {
    name: "post-tab",
    component: PostTab,
    title: "Post",
    icon: <Ionicons size={24} name="push-outline" />,
  },
  {
    name: "account-tab",
    component: AccountTab,
    title: "Account",
    icon: <Ionicons size={24} name="person-circle-outline" />,
  },
];

export default function HomeTabNavigation() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={false} style="auto" />
      <Tab.Navigator id={null}>
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
