import Color from "color";
import type typeColor from "color";

type ColorParamNoColor = Exclude<ColorParam, typeColor>;
export type ColorParam = NonNullable<(Parameters<typeof typeColor>)[0]>;

export function getColorObj(color: Color): Color;
export function getColorObj(color: ColorParamNoColor): Color | null;
export function getColorObj(color: Color | ColorParamNoColor): Color | null {
  try {
    return Color(color);
  } catch (error) {
    return null;
  }
}

type adjustMode = "lighten" | "darken";
export function colorWhiteBlackAdjust(color: typeColor, percentage?: number, mode?: adjustMode): typeColor;
export function colorWhiteBlackAdjust(color: ColorParamNoColor, percentage?: number, mode?: adjustMode): typeColor | null;
export function colorWhiteBlackAdjust(color: null, percentage?: number, mode?: adjustMode): null;
export function colorWhiteBlackAdjust(color: typeColor | ColorParamNoColor | null, percentage: number = 0.1, mode: adjustMode = "lighten"): typeColor | null {
  if (color === null) return null;
  const colorObj = getColorObj(color);
  if (!colorObj) return null;

  return mode === "lighten" ? colorObj.lighten(percentage) : colorObj.darken(percentage);
}
