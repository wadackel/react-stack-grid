global.window.requestAnimationFrame = callback => (
  setTimeout(callback, 1)
);

global.window.cancelAnimationFrame = () => {};
