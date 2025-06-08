import { NavigationProp, StackProps } from "@/lib/routes/types";
import { Button } from "@react-navigation/elements";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function HomeScreen(prp: StackProps) {
  return (
    <View>
      <Button
        onPressIn={() => {
          prp.navigation.push("home_tab");
        }}
      >
        Click
      </Button>

      <Text>Oke Letsgo</Text>
    </View>
  );
}
