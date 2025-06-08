import { Text } from "@/components/Typography";
import { useAppDispatch } from "@/lib/store";
import { setIsAuthenticated } from "@/stores/feature/auth/authSlice";
import { useEffect } from "react";
import { Alert, Button, View } from "react-native";

export default function LoginView() {
  useEffect(() => {
    Alert.alert("Opps! Session Habis", "Silahkan login kembali untuk memulai");
  }, []);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Button
        onPress={() => {
          dispatch(setIsAuthenticated(true));
        }}
        title="login"
      />
    </View>
  );
}
