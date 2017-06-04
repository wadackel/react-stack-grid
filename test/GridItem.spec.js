import assert from 'power-assert';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { easings, transitions } from '../src/';
import GridItem from '../src/components/GridItem';


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
  before(() => {
    clock = sinon.useFakeTimers();
  });

  after(() => {
    clock.restore();
  });


  it('Should be call handleMounted/handleUnmount', () => {
    const handleMounted = sinon.spy();
    const handleUnmount = sinon.spy();

    assert(handleMounted.called === false);

    const wrapper = mount(
      <GridItem
        {...mockProps}
        onMounted={handleMounted}
        onUnmount={handleUnmount}
      />
    );

    assert(handleMounted.called === true);

    wrapper.unmount();
    assert(handleUnmount.called === true);
  });


  it('Should be call transition style function', () => {
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

    assert(spyFunctions.appear.called === true);

    gridItem.componentDidAppear(() => {});
    clock.tick(300);
    assert(spyFunctions.appeared.called === true);

    clock.tick(300);
    gridItem.componentWillEnter(noop);
    assert(spyFunctions.enter.called === true);

    clock.tick(300);
    gridItem.componentDidEnter();
    assert(spyFunctions.entered.called === true);

    clock.tick(300);
    gridItem.componentWillLeave(noop);
    assert(spyFunctions.leaved.called === true);
  });
});
