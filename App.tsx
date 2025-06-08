"strict";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Font from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import { useLogger } from "@react-navigation/devtools";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { AppNavigation } from "@/Navigation";
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: false,
});
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});
export default function App() {
  const containerRef = useNavigationContainerRef();
  useLogger(containerRef);
  const [loading, setLoading] = useState(true);
  const lockScreenOrientation = useCallback(async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        Roboto: require("./assets/fonts/roboto/Roboto-Regular.ttf"),
        RobotoBold: require("./assets/fonts/roboto/Roboto-Bold.ttf"),
        RobotoMedium: require("./assets/fonts/roboto/Roboto-Medium.ttf"),
        RobotoLight: require("./assets/fonts/roboto/Roboto-Light.ttf"),
        RobotoExtraBold: require("./assets/fonts/roboto/Roboto-ExtraBold.ttf"),
        RobotoSemiBold: require("./assets/fonts/roboto/Roboto-SemiBold.ttf"),
        Onest: require("./assets/Onest/static/Onest-Regular.ttf"),
        OnestBold: require("./assets/Onest/static/Onest-Bold.ttf"),
        OnestExtraBold: require("./assets/Onest/static/Onest-ExtraBold.ttf"),
        OnestLight: require("./assets/Onest/static/Onest-Light.ttf"),
        OnestMedium: require("./assets/Onest/static/Onest-Medium.ttf"),
        OnestSemiBold: require("./assets/Onest/static/Onest-SemiBold.ttf"),
        OnestThin: require("./assets/Onest/static/Onest-Thin.ttf"),
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadApp = useCallback(async () => {
    await Promise.all([lockScreenOrientation(), loadFonts()]);
    setLoading(false);
  }, []);
  useEffect(() => {
    loadApp();
  }, []);
  useEffect(() => {
    (async () => {
      if (!loading) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [loading]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NavigationContainer ref={containerRef}>
          {loading ? (
            <ActivityIndicator size={40} style={{ flex: 1 }} />
          ) : (
            <AppNavigation />
          )}
          <StatusBar translucent={true} style="inverted" />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
