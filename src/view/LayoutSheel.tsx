import React, { ReactNode } from "react";
import { Text, ViewComponent } from "react-native";
import { View } from "react-native";
type LayoutSheelType = {
  children: ReactNode;
};
const LayoutSheel = ({ children }: LayoutSheelType) : any => {
  return {children};
};

export default {
  LayoutSheel,
};
