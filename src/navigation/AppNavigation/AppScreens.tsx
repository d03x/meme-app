import {
  NativeStackNavigatorProps,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export enum AppScreens {
  MAIN_TAB = "main-tab",
  ABOUT_SCREEN = "about-screen",
  HOME_SCREEN = "home-scren",
  ACCOUNT_SCREEN = "account-screen",
  POST_SCREEN = "post-screen",
  PRESENSI_SCREEN = "presensi-screen",
}

export type AppScreensLists = {
  [AppScreens.HOME_SCREEN]: undefined;
  [AppScreens.ABOUT_SCREEN]: undefined;
  [AppScreens.ACCOUNT_SCREEN]: undefined;
  [AppScreens.MAIN_TAB]: undefined;
  [AppScreens.POST_SCREEN]: undefined;
  [AppScreens.PRESENSI_SCREEN]: undefined;
};

export type AppScreenProps = NativeStackScreenProps<AppScreensLists>;
