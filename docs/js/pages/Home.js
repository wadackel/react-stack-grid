/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import StackGrid, { transitions, easings } from '../../../src/';
import DemoControl from '../components/DemoControl';

const itemModifier = [
  'pattern1',
  'pattern2',
  'pattern3',
  'gray',
  'gray-light',
  'gray-dark',
  'yellow',
  'pink',
  'purple',
];

export default class Home extends Component {
  constructor(props) {
    super(props);

    const items = [];

    for (let i = 0; i < 10; i += 1) {
      items.push(this.createItem());
    }

    this.state = {
      items,
      duration: 480,
      columnWidth: 150,
      gutter: 5,
      easing: easings.quartOut,
      transition: 'fadeDown',
    };
  }

  createItem() {
    const id = Math.random().toString(36).substr(2, 9);
    const height = Math.floor((Math.random() * (300 - 80)) + 80);
    const modifier = itemModifier[Math.floor(Math.random() * itemModifier.length)];

    return { id, height, modifier };
  }

  shuffleItems = () => {
    const newItems = [...this.state.items];
    let i = newItems.length;

    while (i) {
      const j = Math.floor(Math.random() * i);
      const t = newItems[--i]; // eslint-disable-line no-plusplus
      newItems[i] = newItems[j];
      newItems[j] = t;
    }

    this.setState({ items: newItems });
  }

  prependItem = () => {
    this.setState({
      items: [this.createItem(), ...this.state.items],
    });
  }

  appendItem = () => {
    this.setState({
      items: [...this.state.items, this.createItem()],
    });
  }

  multipleAppendItem = () => {
    const newItems = [];

    for (let i = 0; i < 5; i += 1) {
      newItems.push(this.createItem());
    }

    this.setState({
      items: [...this.state.items, ...newItems],
    });
  }

  removeItem = (id) => {
    this.setState({
      items: this.state.items.filter(o => o.id !== id),
    });
  }

  handleDurationChange = (duration) => {
    this.setState({ duration });
  }

  handleColumnWidthChange = (columnWidth) => {
    this.setState({ columnWidth });
  }

  handleGutterChange = (gutter) => {
    this.setState({ gutter });
  }

  handleEasingChange = (easing) => {
    this.setState({ easing });
  }

  handleTransitionChange = (transition) => {
    this.setState({ transition });
  }

  render() {
    const {
      items,
      duration,
      columnWidth,
      gutter,
      easing,
      transition: transitionSelect,
    } = this.state;

    const transition = transitions[transitionSelect];

    return (
      <div>
        <DemoControl
          duration={duration}
          columnWidth={columnWidth}
          gutter={gutter}
          easing={easing}
          transition={transition}
          onShuffle={this.shuffleItems}
          onPrepend={this.prependItem}
          onAppend={this.appendItem}
          onMultipleAppend={this.multipleAppendItem}
          onDurationChange={this.handleDurationChange}
          onColumnWidthChange={this.handleColumnWidthChange}
          onGutterChange={this.handleGutterChange}
          onEasingChange={this.handleEasingChange}
          onTransitionChange={this.handleTransitionChange}
        />

        <StackGrid
          duration={duration}
          columnWidth={columnWidth}
          gutterWidth={gutter}
          gutterHeight={gutter}
          easing={easing}
          appear={transition.appear}
          appeared={transition.appeared}
          enter={transition.enter}
          entered={transition.entered}
          leaved={transition.leaved}
        >
          {items.map(item =>
            (<div
              key={item.id}
              className={`item item--${item.modifier}`}
              style={{ height: item.height }}
              onClick={() => this.removeItem(item.id)}
            />)
          )}
        </StackGrid>
      </div>
    );
  }
}
