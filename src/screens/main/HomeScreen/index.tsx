import { AppScreenProps, AppScreens } from "@/navigation/AppNavigation/AppScreens";
import { useEffect } from "react";
import { Button, Text } from "react-native";

export default function HomeScreenTab({navigation}: AppScreenProps) {
  return (
    <Button
      title="Back to account"
      onPress={() => {
        navigation.push(AppScreens.HOME_SCREEN);
      }}
    />
  );
}
