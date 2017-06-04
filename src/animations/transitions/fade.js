// @flow
export const appear = () => ({ opacity: 0 });

export const appeared = () => ({ opacity: 1 });

export const enter = appear;

export const entered = appeared;

export const leaved = appear;
