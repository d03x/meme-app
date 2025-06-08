import HomeScreen from "@screen/home-screen";
import About from "@screen/about-screen";
import HomeScreenTabNavigation from "@/screens/main";
import { createNativeStackNavigatorWithAuth } from "@/view/sheel/createNativeStackNavigatorWithAuth";
import { HomeNavigatorParams } from "@/lib/routes/types";
const Stack = createNativeStackNavigatorWithAuth<HomeNavigatorParams>(null);
function commonScreens(Common: typeof Stack) {
  return (
    <>
      <Common.Screen name="home_screen" component={HomeScreen} />
      <Common.Screen name="about_screen" component={About} />
    </>
  );
}
export function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, animation: "ios_from_left" }}
      initialRouteName="home_screen"
      id={null}
    >
      {commonScreens(Stack)}
      <Stack.Screen
        options={{ headerShown: false }}
        name="home_tab"
        component={HomeScreenTabNavigation}
      />
    </Stack.Navigator>
  );
}
