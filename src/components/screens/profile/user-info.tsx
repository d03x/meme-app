import IconButton from "@/components/icon-button";
import DisplayName from "@/components/profile/display-name";
import NicknameDisplay from "@/components/profile/nickname-display";
import { Text } from "@/components/typography";
import { PRIMARY_COLOR } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@react-navigation/elements";
import {
  Image,
  StyleSheet,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const HEADER_HEIGHT = 120;
const CONTANER_HEIGHT = HEADER_HEIGHT + 120;
export default function UserInfo({ scrollY }: any) {
  const { top } = useSafeAreaInsets();
  const statusBarHeight = top > 50 ? 50 : top;
  const headerStyle = useAnimatedStyle(() => {
    return {
      height:withTiming(interpolate(scrollY.value,[95,10],[0,(CONTANER_HEIGHT)],"clamp"),{
        duration:240,
      }),
      transform: [
        {
          translateY: withTiming(interpolate(scrollY.value, [10, 110], [0, -190], "clamp"),{duration:200,}),
        },
      ],
    };
  });
  return (
    <Animated.View style={[headerStyle, styles.container]}>
      {/* HEADER */}
      <Animated.View style={[styles.banner]}>
        <Animated.Image
          style={styles.banner_image}
          source={{
            uri: "https://images.unsplash.com/photo-1749223062893-0c583c9b8806?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
          }}
        />
      </Animated.View>
      <Animated.View style={[styles.profile_info]}>
        <View style={styles.profile_info_header}>
          <Animated.Image
            style={[styles.profile_photo]}
            source={{
              uri: "https://avatars.githubusercontent.com/u/149863272?v=4&size=70",
            }}
          />
          <IconButton
            icon={
              <Ionicons
                color={"gray"}
                style={{ marginLeft: "auto" }}
                size={29}
                name="ellipsis-horizontal-circle"
              />
            }
          />
        </View>
        <Animated.View style={[styles.profile_info_details]}>
          <DisplayName isVerified name="Dadan Hidayat" />
          <NicknameDisplay name="andry.efendy" />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: CONTANER_HEIGHT,
  },
  profile_info_details: {},
  banner: {
    height: HEADER_HEIGHT,
  },
  profile_info_header: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  profile_info: {
    paddingInline: 7,
    marginTop: -30,
  },
  profile_photo: {
    marginRight: "auto",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 100,
    width: 70,
    aspectRatio: 1 / 1,
  },
  banner_image: {
    width: "100%",
    height: HEADER_HEIGHT,
  },
});
