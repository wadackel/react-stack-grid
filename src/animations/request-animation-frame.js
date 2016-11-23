// @flow
import ExecutionEnvironment from "exenv";

const vendors = ["ms", "moz", "webkit"];
let tmpRaf = null;
let tmpCaf = null;

if (ExecutionEnvironment.canUseDOM) {
  tmpRaf = window.requestAnimationFrame;
  tmpCaf = window.cancelAnimationFrame;

  for (let x = 0; x < vendors.length && !tmpRaf; ++x) {
    tmpRaf = window[`${vendors[x]}RequestAnimationFrame`];
    tmpCaf = window[`${vendors[x]}CancelAnimationFrame`] ||
      window[`${vendors[x]}CancelRequestAnimationFrame`];
  }

} else {
  tmpRaf = (callback: Function): number => callback();
  tmpCaf = (id: number): void => {}; // eslint-disable-line no-unused-vars
}

export const raf = tmpRaf;
export const caf = tmpCaf;
