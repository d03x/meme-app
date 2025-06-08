import { Text } from "@/components/Typography";
import { StackProps } from "@/lib/routes/types";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { RootState } from "@/stores";
import { setIsAuthenticated } from "@/stores/feature/auth/authSlice";
import { Pressable } from "react-native";

export default function HomeScreen(prp: StackProps) {
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
