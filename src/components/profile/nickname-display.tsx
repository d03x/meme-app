import { PRIMARY_COLOR } from "@/utils/colors";
import { Text } from "../Typography";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
type NicknameProps = {
  name: string;
};
const NicknameDisplay = (props: NicknameProps) => {
  return (
    <View style={{flexDirection:"row"}}>
      <Ionicons style={{marginRight:1}} color={"black"} name="at" size={12} />
      <Text color={PRIMARY_COLOR} size={12} type="Medium">
        {props.name}
      </Text>
    </View>
  );
};

export default NicknameDisplay;
