import { SceneRendererProps, TabView } from "react-native-tab-view";
import SceneTab from "./scene-tabs";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  useWindowDimensions,
} from "react-native";
import { ReactNode } from "react";
import Animated from "react-native-reanimated";

const CreateTab = ({
  routes,
  index,
  setIndex,
  onScroll,
}: {
  routes: any[];
  index;
  onScroll: (props: NativeSyntheticEvent<NativeScrollEvent>) => void;
  setIndex: (item) => void;
}) => {
  const layout = useWindowDimensions();

  const tabBar = (props) => <SceneTab {...props} />;
  return (
    <TabView
      navigationState={{ index, routes: routes }}
      renderTabBar={tabBar}
      renderScene={(route) => {
        const component = routes.map((ea, index) => {
          if (ea.key === route.route.key) {
            return (
              <Animated.ScrollView onScroll={onScroll} key={index}>
                {ea.component}
              </Animated.ScrollView>
            );
          }
        });
        return component;
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default CreateTab;
