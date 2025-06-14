import MediaProfileTab from "@/screens/main/Account/media-tab";
import PostProfileTab from "@/screens/main/Account/post-tab";
import UserInfo from "@/components/profile/user-info";
import CreateTab from "@/components/tabs/CreateTab";
import React, { useCallback, useEffect, useMemo } from "react";
import { View } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

function AccountScreenTab({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const scrollY = useSharedValue(0);
  const onScroll = useCallback(
    useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
      },
    }),
    []
  );
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    scrollY.value = 0;
  }, [index]);

  const setIndexCallback = useCallback(setIndex, []);

  const routes = useMemo(
    () => [
      { key: "media", title: "Media", component: <MediaProfileTab /> },
      { key: "posts", title: "Posts", component: <PostProfileTab /> },
      { key: "followers", title: "Followers", component: <PostProfileTab /> },
    ],
    []
  );
  return (
    <View style={{ flex: 1 }}>
      <UserInfo scrollY={scrollY} />
      <CreateTab
        onScroll={onScroll}
        index={index}
        setIndex={setIndexCallback}
        routes={routes}
      />
    </View>
  );
}
export { AccountScreenTab };
