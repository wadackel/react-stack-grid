// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import { transition, buildStyles } from '../utils/style-helper';
import { raf } from '../animations/request-animation-frame';

import type { Units, Rect } from '../types/';

type Props = {
  itemKey: string;
  index: number;
  component: string,
  rect: Rect;
  containerSize: {
    width: number;
    height: number;
    actualWidth: number;
  };
  duration: number;
  easing: string;
  appearDelay: number;
  appear: Function;
  appeared: Function;
  enter: Function;
  entered: Function;
  leaved: Function;
  units: Units;
  vendorPrefix: boolean;
  userAgent: ?string;
  onMounted: Function;
  onUnmount: Function;
  rtl: boolean;
};

type State = Object;

const getTransitionStyles = (type: string, props: Props): Object => {
  const { rect, containerSize, index } = props;

  return props[type](rect, containerSize, index);
};

const getPositionStyles = (rect: Rect, zIndex: number, rtl: boolean): Object => ({
  translateX: `${rtl ? -Math.round(rect.left) : Math.round(rect.left)}px`,
  translateY: `${Math.round(rect.top)}px`,
  zIndex,
});


export default class GridItem extends Component {
  props: Props;
  state: State;
  node: ?HTMLElement;
  mounted: boolean;
  appearTimer: ?number;

  static propTypes = {
    itemKey: PropTypes.string,
    index: PropTypes.number,
    component: PropTypes.string,
    rect: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    containerSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      actualWidth: PropTypes.number,
    }),
    duration: PropTypes.number,
    easing: PropTypes.string,
    appearDelay: PropTypes.number,
    appear: PropTypes.func,
    appeared: PropTypes.func,
    enter: PropTypes.func,
    entered: PropTypes.func,
    leaved: PropTypes.func,
    units: PropTypes.shape({
      length: PropTypes.string,
      angle: PropTypes.string,
    }),
    vendorPrefix: PropTypes.bool,
    userAgent: PropTypes.string,
    onMounted: PropTypes.func,
    onUnmount: PropTypes.func,
    rtl: PropTypes.bool,
  };

  constructor(props: Props) {
    super(props);

    this.mounted = false;
    this.appearTimer = null;
    this.node = null;

    this.state = {
      ...getPositionStyles(props.rect, 1, props.rtl),
      ...getTransitionStyles('appear', props),
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.props.onMounted(this);
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.appearTimer);
    this.appearTimer = null;
    this.props.onUnmount(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!shallowequal(nextProps, this.props)) {
      raf(() => {
        this.setStateIfNeeded({
          ...this.state,
          ...getPositionStyles(nextProps.rect, 2, nextProps.rtl),
        });
      });
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !shallowequal(nextProps, this.props) ||
      !shallowequal(nextState, this.state)
    );
  }

  componentWillAppear(callback: Function) {
    this.appearTimer = setTimeout(callback, this.props.appearDelay * this.props.index);
  }

  componentDidAppear() {
    this.setAppearedStyles();
  }

  componentWillEnter(callback: Function) {
    this.setEnterStyles();
    this.forceUpdate(callback);
  }

  componentDidEnter() {
    this.setEnteredStyles();
  }

  componentWillLeave(callback: Function) {
    this.setLeaveStyles();
    setTimeout(callback, this.props.duration);
  }

  setStateIfNeeded(state: Object) {
    if (this.mounted) {
      this.setState(state);
    }
  }

  setAppearedStyles() {
    this.setStateIfNeeded({
      ...this.state,
      ...getTransitionStyles('appeared', this.props),
      ...getPositionStyles(this.props.rect, 1, this.props.rtl),
    });
  }

  setEnterStyles() {
    this.setStateIfNeeded({
      ...this.state,
      ...getPositionStyles(this.props.rect, 2, this.props.rtl),
      ...getTransitionStyles('enter', this.props),
    });
  }

  setEnteredStyles() {
    this.setStateIfNeeded({
      ...this.state,
      ...getTransitionStyles('entered', this.props),
      ...getPositionStyles(this.props.rect, 1, this.props.rtl),
    });
  }

  setLeaveStyles() {
    this.setStateIfNeeded({
      ...this.state,
      ...getPositionStyles(this.props.rect, 2, this.props.rtl),
      ...getTransitionStyles('leaved', this.props),
    });
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      index,
      component: Element,
      containerSize,
      appearDelay,
      appear,
      appeared,
      enter,
      entered,
      leaved,
      onMounted,
      onUnmount,
      itemKey,
      /* eslint-enable no-unused-vars */
      rect,
      duration,
      easing,
      units,
      vendorPrefix,
      userAgent,
      rtl,
      ...rest
    } = this.props;

    const style = buildStyles({
      ...this.state,
      display: 'block',
      position: 'absolute',
      top: 0,
      opacity: 1,
      ...(rtl ? { right: 0 } : { left: 0 }),
      width: rect.width,
      transition: transition(['opacity', 'transform'], duration, easing),
    }, units, vendorPrefix, userAgent);

    /* eslint-disable no-return-assign */
    return (
      <Element
        {...rest}
        ref={node => this.node = node}
        style={style}
      />
    );
    /* eslint-enable no-return-assign */
  }
}
