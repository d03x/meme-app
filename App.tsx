"strict";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect,  useState } from "react";
import * as Font from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import { Provider } from "react-redux";
import { StatusBar, useColorScheme } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator, Platform } from "react-native";
import { useLogger } from "@react-navigation/devtools";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { AppNavigation } from "@/Navigation";
import { store as stores } from "@/stores";
import LinkingConfiguration from "@/navigation/AppNavigation/LinkConfiguration";
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (colorScheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [colorScheme]);
  const renderStatusBar = useCallback(() => {
    const barStyle = isDarkMode ? "light-content" : "dark-content";
    const bg = isDarkMode ? "black" : "white";

    return (
      <>
        {Platform.OS === "ios" ? (
          <StatusBar barStyle={barStyle} />
        ) : (
          <StatusBar backgroundColor={bg} barStyle={barStyle} />
        )}
      </>
    );
  }, [isDarkMode]);

  const handleNaivgationStateChange = () => {
    const currentRoute = containerRef.current.getCurrentRoute().name;
    console.log(`Current Route: ${currentRoute}`);
  };

  return (
    <SafeAreaProvider>
      <Provider store={stores}>
        <GestureHandlerRootView>
          <NavigationContainer
            onStateChange={handleNaivgationStateChange}
            linking={LinkingConfiguration}
            ref={containerRef}
          >
            {loading ? (
              <ActivityIndicator size={40} style={{ flex: 1 }} />
            ) : (
              <AppNavigation />
            )}
            {renderStatusBar()}
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}
