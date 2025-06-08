import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type CommonNavigationParams = {
  HomeScreen: undefined;
  AboutScreen: undefined;
};

export type MainTabNavigatorParams = CommonNavigationParams & {
  MainTab: undefined;
};
export type MainTabNavigationParams = CommonNavigationParams & {
    home : undefined,
    account:undefined,
    post:undefined,
}
export type AllNavigationProps = CommonNavigationParams & {
  MainTab: undefined;
};
export type NavigationProp = NativeStackNavigationProp<AllNavigationProps>;
export type StackProps = NativeStackScreenProps<AllNavigationProps>;
