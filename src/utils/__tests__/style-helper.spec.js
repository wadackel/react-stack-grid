/* eslint-disable max-len */
import { transition, buildStyles } from '../style-helper';


describe('style-helper', () => {
  test('Should be build a transition string', () => {
    expect(transition(['opacity'], 1000, 'ease-in')).toBe('opacity 1000ms ease-in');

    const easing = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
    expect(transition(['transform', 'opacity', 'background'], 200, easing)).toBe([
      `transform 200ms ${easing}`,
      `opacity 200ms ${easing}`,
      `background 200ms ${easing}`,
    ].join(','));
  });


  test('Should be build a style object', () => {
    const ios8 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4';
    const units = {
      length: 'px',
      angle: 'deg',
    };

    expect(buildStyles({
      opacity: 1,
      fontSize: 16,
    }, units, false)).toEqual({
      opacity: 1,
      fontSize: 16,
    });

    expect(buildStyles({
      opacity: 1,
      translateX: 900,
      translateY: 200,
      scale: 0.8,
      perspective: 1000,
    }, units, false)).toEqual({
      opacity: 1,
      perspective: 1000,
      transform: 'translateX(900px) translateY(200px) scale(0.8) perspective(1000px)',
    });

    expect(buildStyles({
      opacity: 1,
      translateX: 900,
      translateY: 200,
      scale: 0.8,
      perspective: 1000,
    }, units, true, ios8)).toEqual({
      opacity: 1,
      WebkitPerspective: 1000,
      WebkitTransform: 'translateX(900px) translateY(200px) scale(0.8) perspective(1000px)',
    });
  });
});
