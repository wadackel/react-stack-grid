import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { easings, transitions } from '../../';
import GridItem from '../GridItem';


const mockProps = {
  rect: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  containerSize: {
    width: 960,
    height: 0,
  },
  index: 0,
  easing: easings.quartOut,
  appearDelay: 30,
  appear: transitions.fadeUp.appear,
  appeared: transitions.fadeUp.appeared,
  enter: transitions.fadeUp.enter,
  entered: transitions.fadeUp.entered,
  leaved: transitions.fadeUp.leaved,
  units: { length: 'px', angle: 'deg' },
  vendorPrefix: true,
  userAgent: null,
  onMounted: () => {},
  onUnmount: () => {},
};

let clock = null;


describe('<GridItem />', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });


  test('Should be call handleMounted/handleUnmount', () => {
    const handleMounted = sinon.spy();
    const handleUnmount = sinon.spy();

    expect(handleMounted.called).toBe(false);

    const wrapper = mount(
      <GridItem
        {...mockProps}
        onMounted={handleMounted}
        onUnmount={handleUnmount}
      />
    );

    expect(handleMounted.called).toBe(true);

    wrapper.unmount();
    expect(handleUnmount.called).toBe(true);
  });


  test('Should be call transition style function', () => {
    const spyFunctions = {
      appear: sinon.spy(),
      appeared: sinon.spy(),
      enter: sinon.spy(),
      entered: sinon.spy(),
      leaved: sinon.spy(),
    };

    const wrapper = mount(
      <GridItem
        {...mockProps}
        {...spyFunctions}
        duration={300}
      >
        Item
      </GridItem>
    );

    const gridItem = wrapper.instance();
    const noop = () => {};

    expect(spyFunctions.appear.called).toBe(true);

    gridItem.componentDidAppear(() => {});
    clock.tick(300);
    expect(spyFunctions.appeared.called).toBe(true);

    clock.tick(300);
    gridItem.componentWillEnter(noop);
    expect(spyFunctions.enter.called).toBe(true);

    clock.tick(300);
    gridItem.componentDidEnter();
    expect(spyFunctions.entered.called).toBe(true);

    clock.tick(300);
    gridItem.componentWillLeave(noop);
    expect(spyFunctions.leaved.called).toBe(true);
  });
});
