import MediaProfileTab from "@/components/screens/profile/media-tab";
import PostProfileTab from "@/components/screens/profile/post-tab";
import UserInfo from "@/components/screens/profile/user-info";
import { PRIMARY_COLOR, PRIMARY_COLOR_2 } from "@/utils/colors";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationState,
  SceneRendererProps,
  TabDescriptor,
  TabView,
} from "react-native-tab-view";

const RenderTab = (
  tabs: SceneRendererProps &
    SceneRendererProps & {
      navigationState: NavigationState<any>;
      options: Record<string, TabDescriptor<any>> | undefined;
    }
) => {
  const [layouts, setLayouts] = useState<{ x: number; width: number }[]>(
    routes.map(() => ({ x: 0, width: 0 }))
  );
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const isInitalized = useRef(false);
  useEffect(() => {
    const { x, width } = layouts[tabs.navigationState.index] || {
      x: 0,
      width: 0,
    };

    if (isInitalized.current) {
      indicatorX.value = withTiming(x, {
        duration: 250,
      });
      indicatorWidth.value = withTiming(width, {
        duration: 250,
      });
    } else {
      indicatorWidth.value = width;
      indicatorX.value = x;
      isInitalized.current = true;
    }
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
        borderBottomColor: "gray",
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
              alignItems: "center",
              flex: 1,
              alignContent: "center",
              alignSelf: "center",
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

const RenderScene = ({ route, scrollHandler }: any) => {
  switch (route.key) {
    case "media":
      return (
        <Animated.ScrollView onScroll={scrollHandler}>
          <MediaProfileTab />
        </Animated.ScrollView>
      );
      break;
    case "posts":
      return (
        <Animated.ScrollView onScroll={scrollHandler}>
          <PostProfileTab />
        </Animated.ScrollView>
      );
      break;
    case "followers":
      return (
        <Animated.ScrollView onScroll={scrollHandler}>
          <PostProfileTab />
        </Animated.ScrollView>
      );
      break;
    default:
      break;
  }
};

const routes = [
  { key: "media", title: "Media" },
  { key: "posts", title: "Posts" },
  { key: "followers", title: "Followers" },
];

function AccountTab({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  const renderTab = useMemo(() => RenderTab, []);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  return (
    <View style={{ flex: 1 }}>
      <UserInfo scrollY={scrollY} />
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTab}
        renderScene={(e) => {
          return <RenderScene route={e.route} scrollHandler={onScroll} />;
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}

export { AccountTab, RenderTab };
