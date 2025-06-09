import AppLogo from "@/components/AppLogo";
import IconButton from "@/components/IconButton";
import { Text } from "@/components/Typography";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Header } from "@react-navigation/elements";
import { memo, ReactNode } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const headerHeight = 60;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    elevation: 9,
  },
  headerContent: {
    paddingInline: 15,
    borderBlockColor: "#dedede",
    height: headerHeight,
    flexDirection: "row",
    alignItems: "center",
  },
});
const AppHeader = memo(() => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.header,
        {
          height: headerHeight + top,
        },
      ]}
    >
      <View style={[styles.headerContent, { marginTop: top }]}>
        <AppLogo />
        <View
          style={{
            flexDirection: "row",
            marginLeft: "auto",
          }}
        >
          <IconButton icon={<Feather name="search" size={25} />} />
          <IconButton icon={<Feather name="user-plus" size={25} />} />
          <IconButton badge="4" icon={<Feather name="bell" size={25} />} />
          <IconButton icon={<Feather name="compass" size={25} />} />
        </View>
      </View>
    </View>
  );
});

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        height,
      }}
    >
      <AppHeader />
      {children}
    </View>
  );
};
