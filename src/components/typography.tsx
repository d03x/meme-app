import { Text as BaseText } from "react-native";
type TextProps = {
  type?: "bold" | "ExtraBold" | "Thin" | "light" | "Medium" | "Semibold";
  children:any;
  size?:number,
  color?:string,
};
const Text = ({ children, type,size,color }: TextProps) => {
  const font =
    type == "bold"
      ? "OnestBold"
      : type == "ExtraBold"
      ? "OnestExtraBold"
      : type == "Medium"
      ? "OnestMedium"
      : type === "Semibold"
      ? "OnestSemiBold"
      : "Onest";
  return (
    <BaseText
      style={{
        color:color,
        fontSize:size ? size : 14,
        fontFamily: font,
      }}
    >
      {children}
    </BaseText>
  );
};
export { Text };
