import {
  AppNativeStackScreenProps,
  AppScreenProps,
  AppScreens,
} from "@/navigation/AppNavigation/AppScreens";
import { PRIMARY_COLOR } from "@/utils/colors";
import { MainLayout } from "@/view/LayoutSheel";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ReactNode, useEffect } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "react-native-linear-gradient";
export default function HomeScreenTab() {
  const navigation = useNavigation<AppNativeStackScreenProps["navigation"]>();
  return (
    <MainLayout>
      {/* <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          paddingInline: 5,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#f2f2f2",
        }}
      >
        <Pressable
          onPress={() => {
            alert("OKE");
          }}
        >
          <View
            style={{
              borderRadius: 10,
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              aspectRatio: 1 / 1,
            }}
          >
            <Image
              style={{
                width: 55,
                height: 55,
                borderRadius: 10,
                aspectRatio: 1 / 1,
              }}
              source={{
                uri: "https://avatars.githubusercontent.com/u/149863272?v=4",
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                borderRadius: 100,
              }}
            >
              <Ionicons name="add-circle" color={PRIMARY_COLOR} size={24} />
            </View>
          </View>
        </Pressable>
        <ScrollView horizontal>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    borderRadius: 10,
                    marginRight: 12,
                    overflow: "hidden",
                    backgroundColor: "#f2f2f2",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    aspectRatio: 1 / 1,
                  }}
                >
                  <Image
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 10,
                      aspectRatio: 1 / 1,
                    }}
                    source={{
                      uri: "https://avatars.githubusercontent.com/u/149863272?v=4",
                    }}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View> */}
      <View>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero nobis
          laborum necessitatibus illo assumenda nemo eum at provident. Eum
          facere doloribus accusantium itaque labore nisi dolores eius quae
          possimus nesciunt. Inventore quia dignissimos iusto. Quo facilis
          exercitationem fuga distinctio deserunt repudiandae, eveniet tempora
          nihil, nemo voluptates quas corrupti vitae pariatur ut, consequatur
          sequi? Ab sequi debitis pariatur, repudiandae voluptates iste.
          Quisquam impedit alias odit omnis praesentium quidem quae animi sequi
          perferendis voluptatibus harum excepturi explicabo odio, sed ratione?
          Neque iusto veritatis nam atque, rerum laborum doloribus autem
          officiis delectus exercitationem.
        </Text>
      </View>
    </MainLayout>
  );
}
