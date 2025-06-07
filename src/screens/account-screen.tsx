import { Text } from "@react-navigation/elements";
import { View } from "react-native";

export default function AccountScreen({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  });
  return (
    <View
      style={{
        flex: 1,
      }}
    ></View>
  );
}
