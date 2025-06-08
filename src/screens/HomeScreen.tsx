import { NavigationProp, StackProps } from "@/lib/routes/types";
import LayoutSheel from "@/view/LayoutSheel";
import { Button } from "@react-navigation/elements";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(prp: StackProps) {
  return <Button onPressIn={()=>prp.navigation.popTo("MainTab")}>Login</Button>
}
