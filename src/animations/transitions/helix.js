// @flow
import type { Rect } from "../../types/";

const common = {
  transformStyle: "preserve-3d",
  backfaceVisibility: "hidden"
};

export const appear = (rect: Rect) => ({
  ...common,
  perspective: rect.height,
  rotateY: -180,
  opacity: 0
});

export const appeared = () => ({
  ...common,
  perspective: 0,
  rotateY: 0,
  opacity: 1
});

export const enter = appeared;

export const entered = appeared;

export const leaved = (rect: Rect) => ({
  ...common,
  perspective: rect.height,
  rotateY: 180,
  opacity: 0
});
