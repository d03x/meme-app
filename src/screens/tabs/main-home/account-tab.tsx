import MediaProfileTab from "@/components/screens/profile/media-tab";
import PostProfileTab from "@/components/screens/profile/post-tab";
import UserInfo from "@/components/screens/profile/user-info";
import CreateTab from "@/components/tabs/create-tab";
import SceneTab from "@/components/tabs/scene-tabs";
import React, { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const scenes = [{}];
// const RenderScene = ({ route, scrollHandler }: any) => {
//   switch (route.key) {
//     case "media":
//       return (
//         <Animated.ScrollView onScroll={scrollHandler}>
//           <MediaProfileTab />
//         </Animated.ScrollView>
//       );
//       break;
//     case "posts":
//       return (
//         <Animated.ScrollView onScroll={scrollHandler}>
//           <PostProfileTab />
//         </Animated.ScrollView>
//       );
//       break;
//     case "followers":
//       return (
//         <Animated.ScrollView onScroll={scrollHandler}>
//           <PostProfileTab />
//         </Animated.ScrollView>
//       );
//       break;
//     default:
//       break;
//   }
// };

const routes = [
  { key: "media", title: "Media", component: <MediaProfileTab /> },
  { key: "posts", title: "Posts", component: <MediaProfileTab /> },
  { key: "followers", title: "Followers", component: <MediaProfileTab /> },
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
  const [index, setIndex] = React.useState(0);
  //render tab
  const renderTab = (props) => {
    return <SceneTab {...props} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <UserInfo scrollY={scrollY} />
      <CreateTab
        onScroll={onScroll}
        index={index}
        setIndex={setIndex}
        routes={routes}
      />
    </View>
  );
}

export { AccountTab };
