import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home-screen";
import About from "@screen/about-screen";
import HomeTab from "@screen/main-home";
import { AccountTab } from "@screen/main-home/account";
const Stack = createNativeStackNavigator();
export default function AppRoot() {
  return (
    <Stack.Navigator initialRouteName="home" id={null}>
      <Stack.Group screenOptions={{ headerShown: true }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="about" component={About} />
        <Stack.Screen name="account" component={AccountTab} />
      </Stack.Group>
      <Stack.Screen
        options={{ headerShown: false }}
        name="main-home"
        component={HomeTab}
      />
    </Stack.Navigator>
  );
}
