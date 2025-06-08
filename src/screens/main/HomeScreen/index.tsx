import { StackProps } from "@/lib/routes/types";
import { useEffect } from "react";
import { Button, Text } from "react-native";

export default function HomeScreenTab({ navigation }: StackProps) {
  return (
    <Button
      title="Back to account"
      onPress={() => {
        navigation.push("HomeScreen");
      }}
    />
  );
}
