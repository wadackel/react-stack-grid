// @flow
export const appear = () => ({
  scale: 1.1,
  opacity: 0
});

export const appeared = () => ({
  scale: 1,
  opacity: 1
});

export const enter = appear;

export const entered = appeared;

export const leaved = () => ({
  scale: 0.95,
  opacity: 0
});
