import { View } from "react-native";
import { Text } from "../Typography";
import { Ionicons } from "@expo/vector-icons";
import { Verified } from "../icons/verified";

type DisplayNameProps = {
  name: string;
  isVerified?: boolean;
};
const DisplayName = (props: DisplayNameProps) => {
  return (
    <View
      style={{
        gap: 4,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Text size={18} type="ExtraBold">
        Dadan Hidayat
      </Text>
      {props.isVerified && <Verified />}
    </View>
  );
};

export default DisplayName;
