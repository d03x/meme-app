import { Text } from "@/components/Typography";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { AppScreenProps } from "@/navigation/AppNavigation/AppScreens";
import { RootState } from "@/stores";
import { setIsAuthenticated } from "@/stores/feature/auth/authSlice";
import { Pressable } from "react-native";

export default function HomeScreen(prp: AppScreenProps) {
  const increm = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  return (
    <Pressable
      onPressIn={() => {
        dispatch(setIsAuthenticated(false));
      }}
    >
      <Text>{increm ? "YA" : "NO"}</Text>
    </Pressable>
  );
}
