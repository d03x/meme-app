import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type CommonNavigationParams = {
  home_screen: undefined;
  about_screen: undefined;
};

export type HomeNavigatorParams = CommonNavigationParams & {
  home_tab: undefined;
};
export type MainTabNavigationParams = CommonNavigationParams & {
    home : undefined,
    account:undefined,
    post:undefined,
}
export type AllNavigationProps = CommonNavigationParams & {
  home_tab: undefined;
};
export type NavigationProp = NativeStackNavigationProp<AllNavigationProps>;
export type StackProps = NativeStackScreenProps<AllNavigationProps>;
