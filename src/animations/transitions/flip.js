const common = {
  perspective: 1000,
  transformStyle: "preserve-3d",
  backfaceVisibility: "hidden"
};

export const appear = () => ({
  ...common,
  rotateX: -180,
  opacity: 0
});

export const appeared = () => ({
  ...common,
  rotateX: 0,
  opacity: 1
});

export const enter = appeared;

export const entered = appeared;

export const leaved = appear;
