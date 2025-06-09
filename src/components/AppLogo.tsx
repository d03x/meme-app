import { memo } from "react";
import { View } from "react-native";
import { Text } from "./Typography";
import { PRIMARY_COLOR } from "@/utils/colors";

const AppLogo = memo(() => {
  return (
    <View>
      <Text color={PRIMARY_COLOR} size={24} type="ExtraBold">
        Socialize
      </Text>
    </View>
  );
});
export default AppLogo;
