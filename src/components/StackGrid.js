// @flow
import React, { Component, isValidElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import sizeMe from 'react-sizeme';
import shallowequal from 'shallowequal';
import ExecutionEnvironment from 'exenv';
import invariant from 'invariant';
import GridItem from './GridItem';
import { transition } from '../utils/style-helper';
import { raf } from '../animations/request-animation-frame';
import * as easings from '../animations/easings';
import * as transitions from '../animations/transitions/';

import type { Units } from '../types/';

const imagesLoaded = ExecutionEnvironment.canUseDOM ? require('imagesloaded') : null;


const isNumber = (v: any): boolean => typeof v === 'number' && isFinite(v); // eslint-disable-line no-restricted-globals
const isPercentageNumber = (v: any): boolean => typeof v === 'string' && /^\d+(\.\d+)?%$/.test(v);

// eslint-disable-next-line arrow-parens
const createArray = <T>(v: T, l: number): T[] => {
  const array = [];
  for (let i = 0; i < l; i += 1) array.push(v);
  return array;
};

/* eslint-disable consistent-return */
const getColumnLengthAndWidth = (
  width: number,
  value: number | string,
  gutter: number
): [number, number] => {
  if (isNumber(value)) {
    const columnWidth = parseFloat(value);

  return [
    Math.floor((width - (((width / columnWidth) - 1) * gutter)) / columnWidth),
    columnWidth,
  ];
  } else if (isPercentageNumber(value)) {
    const columnPercentage = parseFloat(value) / 100;
  const maxColumn = Math.floor(1 / columnPercentage);
  const columnWidth = (width - (gutter * (maxColumn - 1))) / maxColumn;

  return [
    maxColumn,
    columnWidth,
  ];
}

invariant(false, 'Should be columnWidth is a number or percentage string.');
};
/* eslint-enable consistent-return */


type Props = {
    children: React$Element<any>;
    className?: string;
    style: Object;
    gridRef?: Function;
    component: string;
    itemComponent: string;
    columnWidth: number | string;
    gutterWidth: number;
    gutterHeight: number;
    duration: number;
    easing: string;
    appearDelay: number;
    appear: Function;
    appeared: Function;
    enter: Function;
    entered: Function;
    leaved: Function;
    units: Units;
    monitorImagesLoaded: boolean;
    vendorPrefix: boolean;
    userAgent: ?string;
    enableSSR: boolean;
    onLayout: Function;
    horizontal: boolean;
    rtl: boolean;
  };
  
type InlineState = {
      rects: Array<{
    top: number;
    left: number;
    width: number;
    height: number;
  }>;
  actualWidth: number;
  height: number;
  columnWidth: number;
};

type InlineProps = Props & {
      refCallback: Function;
  size: {
      width: number;
    height: number;
  }
};

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
      children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    gridRef: PropTypes.func,
    component: PropTypes.string,
    itemComponent: PropTypes.string,
    columnWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    gutterWidth: PropTypes.number,
    gutterHeight: PropTypes.number,
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
  monitorImagesLoaded: PropTypes.bool,
  vendorPrefix: PropTypes.bool,
  userAgent: PropTypes.string,
  enableSSR: PropTypes.bool,
  onLayout: PropTypes.func,
  horizontal: PropTypes.bool,
  rtl: PropTypes.bool,
};
/* eslint-enable react/no-unused-prop-types */

export class GridInline extends Component {
      props: InlineProps;
    state: InlineState;
  items: {[key: string]: GridItem; };
    imgLoad: Object;
    mounted: boolean;
  
  static propTypes = {
      ...propTypes,
      size: PropTypes.shape({
      width: PropTypes.number,
    height: PropTypes.number,
  }),
};

  constructor(props: InlineProps) {
      super(props);

    this.items = {};
    this.imgLoad = {};
    this.mounted = false;
    this.state = this.doLayout(props);
  }

  componentDidMount() {
      this.mounted = true;
    this.updateLayout(this.props);
  }

  componentWillReceiveProps(nextProps: InlineProps) {
    if (!shallowequal(nextProps, this.props)) {
      this.updateLayout(nextProps);
  }
}

  shouldComponentUpdate(nextProps: InlineProps, nextState: InlineState) {
    return (
      !shallowequal(nextProps, this.props) ||
      !shallowequal(nextState, this.state)
    );
  }

  componentWillUnmount() {
      this.mounted = false;
  }

  setStateIfNeeded(state: Object) {
    if (this.mounted) {
      this.setState(state);
  }
}

  getItemHeight(item: any): number {
    if (item.key && this.items.hasOwnProperty(item.key)) {
      const component = this.items[item.key];
    const el = (ReactDOM.findDOMNode(component): any);
    const candidate = [el.scrollHeight, el.clientHeight, el.offsetHeight, 0].filter(isNumber);

    return Math.max(...candidate);
  }

  return 0;
}


  doLayout(props: InlineProps): InlineState {
    if (!ExecutionEnvironment.canUseDOM) {
      return this.doLayoutForSSR(props);
  }

  const results = this.doLayoutForClient(props);

    if (this.mounted && typeof this.props.onLayout === 'function') {
      this.props.onLayout();
  }

  return results;
}

  doLayoutForClient(props: InlineProps): InlineState {
    const {
      size: {width: containerWidth },
    columnWidth: rawColumnWidth,
    gutterWidth,
    gutterHeight,
    horizontal,
  } = props;

  const childArray = React.Children.toArray(props.children);
  const [maxColumn, columnWidth] = getColumnLengthAndWidth(
    containerWidth,
    rawColumnWidth,
    gutterWidth
  );
  const columnHeights = createArray(0, maxColumn);

  let rects;
    if (!horizontal) {
      rects = childArray.map((child) => {
        const column = columnHeights.indexOf(Math.min(...columnHeights));
        const height = this.getItemHeight(child);
        const left = (column * columnWidth) + (column * gutterWidth);
        const top = columnHeights[column];

        columnHeights[column] += Math.round(height) + gutterHeight;

        return { top, left, width: columnWidth, height };
      });
    } else {
      const sumHeights = childArray.reduce(
      (sum, child) => sum + Math.round(this.getItemHeight(child)) + gutterHeight, 0);
    const maxHeight = sumHeights / maxColumn;

    let currentColumn = 0;
      rects = childArray.map((child) => {
        const column = currentColumn >= maxColumn - 1 ? maxColumn - 1 : currentColumn;
    const height = this.getItemHeight(child);
    const left = (column * columnWidth) + (column * gutterWidth);
    const top = columnHeights[column];

    columnHeights[column] += Math.round(height) + gutterHeight;
        if (columnHeights[column] >= maxHeight) {
      currentColumn += 1;
  }

        return {top, left, width: columnWidth, height };
  });
}

const width = (maxColumn * columnWidth) + ((maxColumn - 1) * gutterWidth);
const height = Math.max(...columnHeights) - gutterHeight;
    const finalRects = rects.map(o => ({
      ...o,
      left: o.left + ((containerWidth - width) / 2),
  }));

    return {rects: finalRects, actualWidth: width, height, columnWidth };
  }

  // eslint-disable-next-line class-methods-use-this
  doLayoutForSSR(props: InlineProps): InlineState {
    return {
      rects: React.Children.toArray(props.children).map(() => ({
      top: 0, left: 0, width: 0, height: 0,
  })),
  actualWidth: 0,
  height: 0,
  columnWidth: 0,
};
}

  updateLayout(props: ?InlineProps): void {
    if (!props) {
      this.setStateIfNeeded(this.doLayout(this.props));
    } else {
      this.setStateIfNeeded(this.doLayout(props));
  }
}

  handleItemMounted = (item: GridItem) => {
    const {itemKey: key } = item.props;
    this.items[key] = item;

    if (this.props.monitorImagesLoaded && typeof imagesLoaded === 'function') {
      const node = ReactDOM.findDOMNode(item);
    const imgLoad = imagesLoaded(node);

      imgLoad.once('always', () => raf(() => {
      this.updateLayout(this.props);
  }));

  this.imgLoad[key] = imgLoad;
}

this.updateLayout(this.props);
}

  handleItemUnmount = (item: GridItem) => {
    const {itemKey: key } = item.props;

    if (this.items.hasOwnProperty(key)) {
      delete this.items[key];
  }

    if (this.imgLoad.hasOwnProperty(key)) {
      this.imgLoad[key].off('always');
    delete this.imgLoad[key];
  }
}

  handleRef = () => {
      this.props.refCallback(this);
  };

  render() {
    const {
      /* eslint-disable no-unused-vars */
      gutterWidth,
      gutterHeight,
      columnWidth: rawColumnWidth,
    monitorImagesLoaded,
    enableSSR,
    onLayout,
    horizontal,
    rtl,
    refCallback,
    /* eslint-enable no-unused-vars */
    className,
    style,
    size,
    component,
    itemComponent,
    children,
    ...rest
  } = this.props;

    const {rects, actualWidth, height} = this.state;
    const containerSize = {
      actualWidth,
      width: size.width == null ? 0 : size.width,
    height,
  };
  const validChildren = React.Children
    .toArray(children)
    .filter(child => isValidElement(child));


  /* eslint-disable no-return-assign */
  return (
      <TransitionGroup
      component={component}
      className={className}
      style={{
        ...(style || {}),
        position: 'relative',
        opacity: 1,
        transition: transition(['height'], rest.duration, easings.easeOut),
        height,
      }}
      ref={this.handleRef}
    >
      {validChildren.map((child, i) => (
        <GridItem
          {...rest}
          index={i}
          key={child.key}
          component={itemComponent}
          itemKey={child.key}
          rect={rects[i]}
          rtl={rtl}
          containerSize={containerSize}
          onMounted={this.handleItemMounted}
          onUnmount={this.handleItemUnmount}
        >
          {child}
        </GridItem>
      ))}
    </TransitionGroup>
    );
    /* eslint-enable no-return-assign */
  }
}

const SizeAwareGridInline = sizeMe({
      monitorWidth: true,
    monitorHeight: false,
  })(GridInline);
  
  
export default class StackGrid extends Component {
      static propTypes = propTypes;
  
  static defaultProps = {
      style: {{opacity: 1}},
    gridRef: null,
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
    units: {length: 'px', angle: 'deg' },
    monitorImagesLoaded: false,
    vendorPrefix: true,
    userAgent: null,
    enableSSR: false,
    onLayout: null,
    horizontal: false,
    rtl: false,
  };

  props: Props;
  grid: GridInline;

  updateLayout() {
      this.grid.updateLayout();
  }

  handleRef = (grid: GridInline) => {
      this.grid = grid;

    if (typeof this.props.gridRef === 'function') {
      this.props.gridRef(this);
  }
};

  render() {
    const {
      enableSSR,
      gridRef,
      ...rest
  } = this.props;

  sizeMe.enableSSRBehaviour = enableSSR;

  return (
      <SizeAwareGridInline
      {...rest}
      refCallback={this.handleRef}
    />
    );
  }
}
