import { NavigationProp, StackProps } from "@/lib/routes/types";
import { Button } from "@react-navigation/elements";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(prp: StackProps) {
  return (
    <SafeAreaView>
      <View>
        <Button
          onPressIn={() => {
            prp.navigation.push("MainTab");
          }}
        >
          Click
        </Button>

        <Text>Oke Letsgo</Text>
      </View>
    </SafeAreaView>
  );
}
