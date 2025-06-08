import { Button } from "@react-navigation/elements";
import { Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        onPressIn={() => {
          navigation.push("main-home");
        }}
      >
        Click
      </Button>
     
      <Text>Oke Letsgo</Text>
    </View>
  );
}
