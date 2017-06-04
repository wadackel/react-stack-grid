// @flow
export const appear = () => ({
  scale: 0.9,
  opacity: 0
});

export const appeared = () => ({
  scale: 1,
  opacity: 1
});

export const enter = appear;

export const entered = appeared;

export const leaved = () => ({
  scale: 1.05,
  opacity: 0
});
