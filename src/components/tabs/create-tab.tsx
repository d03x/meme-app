import { SceneRendererProps, TabView } from "react-native-tab-view";
import SceneTab from "./scene-tabs";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  useWindowDimensions,
} from "react-native";
import { memo, ReactNode, useCallback } from "react";
import Animated from "react-native-reanimated";

const CreateTab = ({
  routes,
  index,
  setIndex,
  onScroll,
}: {
  routes: Array<{
    key: string;
    title: string;
    component: ReactNode;
  }>;
  index;
  onScroll: (props: NativeSyntheticEvent<NativeScrollEvent>) => void;
  setIndex: (item) => void;
}) => {
  const layout = useWindowDimensions();
  const tabBar = useCallback((props) => <SceneTab {...props} />, []);
  const renderScene = useCallback(
    ({ route }: SceneRendererProps & { route: { key: string } }) => {
      const activeRoute = routes.find((r) => r.key === route.key);
      if (!activeRoute) {
        console.log("OK");
        return null;
      }
      return (
        <Animated.ScrollView
          overScrollMode={"never"}
          bounces={false}
          removeClippedSubviews={true}
          scrollEventThrottle={16}
          onScroll={onScroll}
          key={index}
        >
          {activeRoute.component}
        </Animated.ScrollView>
      );
    },
    []
  );
  return (
    <TabView
      navigationState={{ index, routes: routes }}
      renderTabBar={tabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default memo(CreateTab);
