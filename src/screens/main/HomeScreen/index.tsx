import {
  AppNativeStackScreenProps,
  AppScreenProps,
  AppScreens,
} from "@/navigation/AppNavigation/AppScreens";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { Button, Text } from "react-native";

export default function HomeScreenTab() {
  const navigation = useNavigation<AppNativeStackScreenProps["navigation"]>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, []);

  return (
    <Button
      title="Back to account"
      onPress={() => {
        navigation.push(AppScreens.HOME_SCREEN, {
          id: Math.random().toString(),
          user: [1, 2, 3, 4],
        });
      }}
    />
  );
}
