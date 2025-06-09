import HomeScreen from "@screen/HomeScreen";
import About from "@/screens/AboutScreen";
import HomeScreenTabNavigation from "@/screens/main";
import { createNativeStackNavigatorWithAuth } from "@/view/sheel/createNativeStackNavigatorWithAuth";
import {
  AppScreens,
  AppScreensLists,
} from "./navigation/AppNavigation/AppScreens";
const Stack = createNativeStackNavigatorWithAuth<AppScreensLists>(null);
function commonScreens(Common: typeof Stack) {
  return (
    <>
      <Common.Screen name={AppScreens.HOME_SCREEN} component={HomeScreen} />
      <Common.Screen name={AppScreens.ABOUT_SCREEN} component={About} />
    </>
  );
}
export function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "ios_from_left" }}
      initialRouteName={AppScreens.MAIN_TAB}
      id={null}
    >
      {commonScreens(Stack)}

      <Stack.Screen
        options={{ headerShown: false }}
        name={AppScreens.MAIN_TAB}
        component={HomeScreenTabNavigation}
      />
    </Stack.Navigator>
  );
}
