import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("screen");

type PercentageValue = `${number}%`;
type SizeType = "width" | "height";

// iphone 11 Pro Max
const logicalWidth = 375;
const logicalHeight = 812;

const xScale = ScreenWidth / logicalWidth;
const yScale = ScreenHeight / logicalHeight;

export function AbsSize(
  size: number | PercentageValue,
  size_type: SizeType = "width"
): number {
  if (size === "100%" && size_type === "width") return ScreenWidth;
  if (size === "100%" && size_type === "height") return ScreenHeight;

  const number = size as number;

  const newSize = size_type === "height" ? number * yScale : number * xScale;

  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function FontSize(size: number) {
  const fontScale = PixelRatio.getFontScale();

  return size + (size - size * fontScale);
}

export function fontSize(size: number) {
  return size;
  // const fontScale = PixelRatio.getFontScale();

  // return size + (size - size * fontScale);
}

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");
const { height: WINDOW_HEIGHT } = Dimensions.get("window");

export const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0;

export const NATIVE_SCREEN_NAVIGATION_BAR_HEIGHT =
  SCREEN_HEIGHT - (WINDOW_HEIGHT + STATUS_BAR_HEIGHT);

export const BOTTOM_TAB_NAVIGATOR_HEIGHT =
  Platform.OS === "ios" ? AbsSize(90) : AbsSize(80);
