// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import shallowequal from "shallowequal";
import { transition, buildStyles } from "../utils/style-helper";
import { raf } from "../animations/request-animation-frame";

import type { Units, Rect } from "../types/";

type Props = {
  itemKey: string;
  index: number;
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
};

type State = Object;

export default class GridItem extends Component {
  props: Props;
  state: State;
  node: ?HTMLElement;
  _isMounted: boolean;
  appearTimer: ?number;

  static propTypes = {
    itemKey: PropTypes.string,
    index: PropTypes.number,
    rect: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    containerSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      actualWidth: PropTypes.number
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
      angle: PropTypes.string
    }),
    vendorPrefix: PropTypes.bool,
    userAgent: PropTypes.string,
    onMounted: PropTypes.func,
    onUnmount: PropTypes.func
  };

  constructor(props: Props) {
    super(props);

    this._isMounted = false;
    this.appearTimer = null;
    this.node = null;

    this.state = {
      ...this.getPositionStyles(props.rect, 1),
      ...this.getTransitionStyles("appear", props)
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.onMounted(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.appearTimer);
    this.appearTimer = null;
    this.props.onUnmount(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!shallowequal(nextProps, this.props)) {
      raf(() => {
        this.setState({
          ...this.state,
          ...this.getPositionStyles(nextProps.rect, 2)
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

  getTransitionStyles(type: string, props: Props): Object {
    const { rect, containerSize, index } = props;

    return props[type](rect, containerSize, index);
  }

  getPositionStyles(rect: Rect, zIndex: number): Object {
    return {
      translateX: `${rect.left}px`,
      translateY: `${rect.top}px`,
      zIndex
    };
  }

  setAppearedStyles() {
    this.setState({
      ...this.state,
      ...this.getTransitionStyles("appeared", this.props),
      ...this.getPositionStyles(this.props.rect, 1)
    });
  }

  setEnterStyles() {
    this.setState({
      ...this.state,
      ...this.getPositionStyles(this.props.rect, 2),
      ...this.getTransitionStyles("enter", this.props)
    });
  }

  setEnteredStyles() {
    this.setState({
      ...this.state,
      ...this.getTransitionStyles("entered", this.props),
      ...this.getPositionStyles(this.props.rect, 1)
    });
  }

  setLeaveStyles() {
    this.setState({
      ...this.state,
      ...this.getPositionStyles(this.props.rect, 2),
      ...this.getTransitionStyles("leaved", this.props)
    });
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      index,
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
      ...rest
    } = this.props;

    const Element = "span";
    const style = buildStyles({
      ...this.state,
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      width: rect.width,
      transition: transition(["opacity", "transform"], duration, easing)
    }, units, vendorPrefix, userAgent);

    /* eslint-disable no-return-assign */
    return <Element
      {...rest}
      ref={node => this.node = node}
      style={style}
    />;
    /* eslint-enable no-return-assign */
  }
}
