import { LinkingOptions } from "@react-navigation/native";
import { AppScreens } from "./AppScreens";

const LinkingConfiguration: LinkingOptions<{}> = {
  prefixes: ["soc://"],
  config: {
    screens: {
      [AppScreens.POST_SCREEN]: {
        path: "products",
      },
    },
  },
};
export default LinkingConfiguration;