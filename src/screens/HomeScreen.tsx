import { Text } from "@/components/Typography";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { AppScreenProps, AppScreens } from "@/navigation/AppNavigation/AppScreens";
import { RootState } from "@/stores";
import { setIsAuthenticated } from "@/stores/feature/auth/authSlice";
import { Pressable } from "react-native";

export type NavigationHomeProp = AppScreenProps<AppScreens.HOME_SCREEN>;

export default function HomeScreen({navigation,route}: AppScreenProps<AppScreens.HOME_SCREEN>) {
  const increm = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const data = route.params.id;
  return (
    <Pressable
      onPressIn={() => {
        dispatch(setIsAuthenticated(false));
      }}
    >
      <Text>{data}</Text>
      <Text>{increm ? "YA" : "NO"}</Text>
    </Pressable>
  );
}
