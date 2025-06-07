import { View } from "react-native";
import { Pressable } from "react-native";

const IconButton = ({icon}: any) => {
  return (
    <Pressable>
      <View>{icon}</View>
    </Pressable>
  );
};
export default IconButton;
