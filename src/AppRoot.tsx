import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home-screen";
import About from "@screen/about-screen";
import HomeScreenTabNavigation from "@/screens/main";
const Stack = createNativeStackNavigator();
export default function AppRoot() {
  return (
    <Stack.Navigator initialRouteName="home" id={null}>
      <Stack.Group screenOptions={{ headerShown: true }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="about" component={About} />
      </Stack.Group>
      <Stack.Screen
        options={{ headerShown: false }}
        name="main-home"
        component={HomeScreenTabNavigation}
      />
    </Stack.Navigator>
  );
}
