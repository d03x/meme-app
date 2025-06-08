import HomeScreen from "@screen/HomeScreen";
import About from "@/screens/AboutScreen";
import HomeScreenTabNavigation from "@/screens/main";
import { createNativeStackNavigatorWithAuth } from "@/view/sheel/createNativeStackNavigatorWithAuth";
import { MainTabNavigatorParams } from "@/lib/routes/types";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Stack = createNativeStackNavigatorWithAuth<MainTabNavigatorParams>(null);
function commonScreens(Common: typeof Stack) {
  return (
    <>
      <Common.Screen name="HomeScreen" component={HomeScreen} />
      <Common.Screen name="AboutScreen" component={About} />
    </>
  );
}
const Drawer = createDrawerNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "ios_from_left" }}
      initialRouteName="HomeScreen"
      id={null}
    >
      {commonScreens(Stack)}

      <Stack.Screen
        options={{ headerShown: false }}
        name="MainTab"
        component={HomeScreenTabNavigation}
      />
    </Stack.Navigator>
  );
}
