import React from 'react';
import { mount } from 'enzyme';
import StackGrid, { easings, transitions } from '../../';
import { GridInline } from '../StackGrid';


const mockProps = {
  size: {
    width: 960,
    height: 0,
  },
  style: {},
  refCallback: () => {},
  component: 'div',
  itemComponent: 'span',
  columnWidth: 150,
  gutterWidth: 5,
  gutterHeight: 5,
  duration: 480,
  easing: easings.quartOut,
  appearDelay: 30,
  appear: transitions.fadeUp.appear,
  appeared: transitions.fadeUp.appeared,
  enter: transitions.fadeUp.enter,
  entered: transitions.fadeUp.entered,
  leaved: transitions.fadeUp.leaved,
  units: { length: 'px', angle: 'deg' },
  monitorImagesLoaded: false,
  vendorPrefix: true,
  userAgent: null,
  onLayout: () => {},
};


describe('<StackGrid /> (GridInline)', () => {
  test('Should not be render children', () => {
    const wrapper = mount(
      <StackGrid />
    );

    expect(wrapper.children()).toHaveLength(0);
  });


  test('Should be pass the base props', () => {
    const wrapper = mount(
      <StackGrid
        className="rsg-grid"
        style={{
          width: 960,
          background: '#fff',
        }}
      >
        <div key="A">A</div>
      </StackGrid>
    );

    expect(wrapper.props().className).toBe('rsg-grid');
    expect(wrapper.props().style).toEqual({
      width: 960,
      background: '#fff',
    });
  });


  test('Should be render with specify component', () => {
    const wrapper = mount(
      <GridInline
        {...mockProps}
        className="rsg-grid"
        component="ul"
        itemComponent="li"
      >
        <div key="A">A</div>
        <div key="B">B</div>
        <div key="C">C</div>
      </GridInline>
    );

    expect(wrapper.find('ul.rsg-grid')).toHaveLength(1);
    expect(wrapper.find('li')).toHaveLength(3);
  });


  test('Should be render children', () => {
    const wrapper = mount(
      <GridInline {...mockProps}>
        <div className="item" key="1">ITEM 1</div>
        <div className="item" key="2">ITEM 2</div>
        <div className="item" key="3">ITEM 3</div>
      </GridInline>
    );

    expect(wrapper.find('div.item')).toHaveLength(3);
  });


  test('Should be get grid ref', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <GridInline
        {...mockProps}
        refCallback={callback}
      >
        <div key="1">Foo</div>
      </GridInline>
    );

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.calls[0]).toEqual([
      wrapper.instance(),
    ]);
  });


  test('Should be call onLayout', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <GridInline
        {...mockProps}
        onLayout={callback}
      >
        <div key="1">Foo</div>
      </GridInline>
    );

    expect(callback.mock.calls).toHaveLength(1);

    wrapper.setProps({
      ...mockProps,
      size: { width: 300, height: 0 },
    });

    expect(callback.mock.calls).toHaveLength(2);
  });

  test('Should be horizontal', () => {
    const testMockProps = Object.assign({}, mockProps, {
      size: {
        width: 320,
        height: 0,
      },
      horizontal: true,
    });

    const wrapper = mount(
      <GridInline {...testMockProps}>
        <div className="item" key="1">ITEM 1</div>
        <div className="item" key="2">ITEM 2</div>
        <div className="item" key="3">ITEM 3</div>
        <div className="item" key="4">ITEM 4</div>
      </GridInline>
    );

    expect(wrapper.find('span').at(0).prop('style').transform).toBe('translateX(8px) translateY(10px)');
    expect(wrapper.find('span').at(1).prop('style').transform).toBe('translateX(8px) translateY(15px)');
    expect(wrapper.find('span').at(2).prop('style').transform).toBe('translateX(163px) translateY(10px)');
    expect(wrapper.find('span').at(3).prop('style').transform).toBe('translateX(163px) translateY(15px)');
  });

  test('Should be horizontal RTL', () => {
    const testMockProps = Object.assign({}, mockProps, {
      size: {
        width: 320,
        height: 0,
      },
      rtl: true,
      horizontal: true,
    });

    const wrapper = mount(
      <GridInline {...testMockProps}>
        <div className="item" key="1">ITEM 1</div>
        <div className="item" key="2">ITEM 2</div>
        <div className="item" key="3">ITEM 3</div>
        <div className="item" key="4">ITEM 4</div>
      </GridInline>
    );
    expect(wrapper.find('span').at(0).prop('style').right).toBe(0);
    expect(wrapper.find('span').at(1).prop('style').right).toBe(0);
    expect(wrapper.find('span').at(2).prop('style').right).toBe(0);
    expect(wrapper.find('span').at(3).prop('style').right).toBe(0);

    expect(wrapper.find('span').at(0).prop('style').transform).toBe('translateX(-8px) translateY(10px)');
    expect(wrapper.find('span').at(1).prop('style').transform).toBe('translateX(-8px) translateY(15px)');
    expect(wrapper.find('span').at(2).prop('style').transform).toBe('translateX(-163px) translateY(10px)');
    expect(wrapper.find('span').at(3).prop('style').transform).toBe('translateX(-163px) translateY(15px)');
  });
});
