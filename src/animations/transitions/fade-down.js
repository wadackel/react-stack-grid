export const appear = rect => ({
  translateY: rect.top - 10,
  opacity: 0
});

export const appeared = () => ({ opacity: 1 });

export const enter = appeared;

export const entered = appeared;

export const leaved = rect => ({
  translateY: rect.top + 10,
  opacity: 0
});
