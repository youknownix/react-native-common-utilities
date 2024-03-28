import { Platform } from "react-native";
import { AbsSize, FontSize } from "./dynamicDimension.utils";
import YAML from "yaml";

const configFileyml = require("./app-config.yml");

const configFile = YAML.parse(configFileyml);

type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | undefined;
export function fontProps(
  fontSize?: number,
  fontWeight?: FontWeight,
  lineHeight?: number,
  fontFamily?: string // explicitly set custom font
) {
  const _fontFamily = fontFamily ? fontFamily : getFontFamily(fontWeight);

  return {
    fontFamily: _fontFamily,
    fontWeight: fontWeight,
    fontSize: fontSize ? FontSize(fontSize) : undefined,
    lineHeight: lineHeight ? AbsSize(lineHeight, "height") : undefined,
  };
}

const getFontFamily = (fontWeight: FontWeight) => {
  switch (fontWeight) {
    case "100":
      return getFontFamilyName(configFile.fonts.fontsByWeight["100"]);
    case "200":
      return getFontFamilyName(configFile.fonts.fontsByWeight["200"]);
    case "300":
      return getFontFamilyName(configFile.fonts.fontsByWeight["300"]);
    case "400":
      return getFontFamilyName(configFile.fonts.fontsByWeight["400"]);
    case "500":
      return getFontFamilyName(configFile.fonts.fontsByWeight["500"]);
    case "600":
      return getFontFamilyName(configFile.fonts.fontsByWeight["600"]);
    case "700":
      return getFontFamilyName(configFile.fonts.fontsByWeight["700"]);
    case "800":
      return getFontFamilyName(configFile.fonts.fontsByWeight["800"]);
    case "900":
      return getFontFamilyName(configFile.fonts.fontsByWeight["900"]);

    default:
      return getFontFamilyName(configFile.fonts.fontsByWeight["default"]);
  }
};

function getFontFamilyName(
  fontNameObject: string | { android: string; ios: string }
) {
  if (typeof fontNameObject === "string") {
    return fontNameObject;
  }

  return Platform.OS === "android"
    ? fontNameObject.android
    : fontNameObject.ios;
}
