import IconButton from "@/components/IconButton";
import DisplayName from "@/components/profile/display-name";
import NicknameDisplay from "@/components/profile/nickname-display";
import { Text } from "@/components/Typography";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const HEADER_HEIGHT = 120;
const PROFILE_PHOTO_WIDTH = 70;
const CONTANER_HEIGHT = HEADER_HEIGHT + 70;
export default function UserInfo({ scrollY }: any) {
  const { top } = useSafeAreaInsets();
  const profileImageStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        interpolate(scrollY.value, [95, 0], [0, 1], "clamp"),
        {
          easing: Easing.out(Easing.ease),
          duration: 200,
        }
      ),
    };
  });
  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 29, 58],
      [
        HEADER_HEIGHT + CONTANER_HEIGHT,
        (HEADER_HEIGHT + CONTANER_HEIGHT) / 2,
        HEADER_HEIGHT,
      ],
      Extrapolation.CLAMP
    );

    return {
      height: withSpring(height, {
        damping: 10,
        stiffness: 300,
        overshootClamping: true,
      }),
    };
  });

  const statistic = [
    {
      key: "followers",
      value: 190,
      label: "Followers",
    },
    {
      key: "followers",
      value: 90,
      label: "Posts",
    },
    {
      key: "followers",
      value: 90,
      label: "Following",
    },
  ];

  return (
    <Animated.View style={[headerStyle, styles.container]}>
      {/* HEADER */}
      <Animated.View style={[styles.banner]}>
        <Pressable style={{ padding: 4 }}>
          <Ionicons size={40} color={"white"} name="arrow-back-circle" />
        </Pressable>
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
            style={[profileImageStyle, styles.profile_photo]}
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
          <View style={styles.profile_info_account}>
            <DisplayName isVerified name="Dadan Hidayat" />
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <NicknameDisplay name="andry.efendy" />
              <Ionicons color={"#c9c9c9"} name="calendar" size={12} />
              <Text size={12} type="Thin">
                Bergabung 2023
              </Text>
            </View>
          </View>
          <View style={styles.statistic}>
            {statistic.map((item, indx) => {
              return (
                <View key={indx} style={styles.statistic_item}>
                  <Text size={12} type="bold">
                    {item.value}
                  </Text>
                  <Text color="#5f5f5f" size={12} type="Medium">
                    {item.label}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text size={13} type="Thin">
            Lorem ipsum dolor sit amet consectetur adipisicing el
            lagiratawansaya wkkw cacing makan...
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  statistic: {
    flex: 1,
    marginTop: 15,
    marginBottom: 12,
    flexDirection: "row",
  },
  profile_info_account: {
    marginTop: 3,
  },
  statistic_item: {
    marginRight: 13,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  container: {
    overflow: "hidden",
    backgroundColor: "white",
    height: CONTANER_HEIGHT,
  },
  profile_info_details: {
    marginTop: 5,
    flexDirection: "column",
  },
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
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 100,
    width: PROFILE_PHOTO_WIDTH,
    aspectRatio: 1 / 1,
  },
  banner_image: {
    zIndex: -999,
    width: "100%",
    height: HEADER_HEIGHT,
    position: "absolute",
  },
});
