import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text as BaseText } from "react-native";
type TextProps = {
  type?: "bold" | "ExtraBold" | "Thin" | "light" | "Medium" | "Semibold";
  children: any;
  size?: number;
  color?: string;
  fonts?: string;
};
const Text = React.memo(
  ({ children, type, size, color, fonts = "Onest", ...props }: TextProps) => {
    const theme = useTheme();
    const font =
      type == `bold`
        ? `${fonts}Bold`
        : type == `ExtraBold`
        ? `${fonts}ExtraBold`
        : type == `Medium`
        ? `${fonts}Medium`
        : type === `Semibold`
        ? `${fonts}SemiBold`
        : `${fonts}`;
    return (
      <BaseText
        aria-label="text"
        testID={`test-${Math.random()}`}
        style={{
          color: color ? color : theme.dark ? "white" : "black",
          fontSize: size ? size : 14,
          fontFamily: font,
        }}
        {...props}
      >
        {children}
      </BaseText>
    );
  }
);
export { Text };
