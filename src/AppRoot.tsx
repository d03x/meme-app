import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import About from "./screens/about-screen";
import HomeTabNavigation from "@/screens/tabs/main-home/home-tab-navigation";
import { AccountTab } from "./screens/tabs/main-home/account-tab";
const Stack = createNativeStackNavigator();

export default function AppRoot() {
  return (
    <Stack.Navigator initialRouteName="home" id={null}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="account" component={AccountTab} />

      <Stack.Screen
        options={{ headerShown: false }}
        name="main-home"
        component={HomeTabNavigation}
      />
    </Stack.Navigator>
  );
}
