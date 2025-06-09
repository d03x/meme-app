import { Text } from "@/components/Typography";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@react-navigation/elements";
import { ReactNode } from "react";
import { useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const headerHeight = 60;
export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        height,
      }}
    >
      {/* Header */}
      <View
        style={{
          height: headerHeight + top,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            paddingInline:15,
            marginTop: top,
            borderBlockColor: "#dedede",
            height: headerHeight,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text size={17} type="Thin">Helo, dadan hidayat</Text>
          <View
            style={{
              flexDirection:"row",
              gap:10,
              marginLeft: "auto",
            }}
          >
            <Ionicons name="notifications-circle-outline" size={28} />
            <Ionicons name="paper-plane-outline" size={28} />
          </View>
        </View>
      </View>
      {children}
    </View>
  );
};
