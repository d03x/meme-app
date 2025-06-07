import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  account: null;
};
export type BottomTabList = {
  post: undefined;
  home: undefined;
  account: undefined;
};
export type StackProps = NativeStackScreenProps<RootStackParamList>;
export type BottomTabNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabList>,
  NativeStackNavigationProp<RootStackParamList>
>;
