/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Slider from 'rc-slider';
import { easings, transitions } from '../../../src/';

const selectEasingOptions = Object.keys(easings).map(k => ({
  label: k,
  value: easings[k],
}));

const selectTransitionOptions = Object.keys(transitions).map(k => ({
  label: k,
  value: k,
}));


export default class DemoControl extends Component {
  handleShuffle = () => {
    this.props.onShuffle();
  }

  handlePrepend = () => {
    this.props.onPrepend();
  }

  handleAppend = () => {
    this.props.onAppend();
  }

  handleMultipleAppend = () => {
    this.props.onMultipleAppend();
  }

  handleDurationChange = (value) => {
    this.props.onDurationChange(value);
  }

  handleColumnWidthChange = (value) => {
    this.props.onColumnWidthChange(value);
  }

  handleGutterChange = (value) => {
    this.props.onGutterChange(value);
  }

  handleEasingChange = (e) => {
    this.props.onEasingChange(e.target.value);
  }

  handleTransitionChange = (e) => {
    this.props.onTransitionChange(e.target.value);
  }

  render() {
    const {
      duration,
      columnWidth,
      gutter,
      easing,
      transition,
    } = this.props;

    return (
      <div className="demo-control">
        <div>
          <button className="btn" onClick={this.handleShuffle}>Shuffle</button>
        </div>

        <div />

        <div>
          <button className="btn" onClick={this.handlePrepend}>Prepend</button>
        </div>

        <div>
          <button className="btn" onClick={this.handleAppend}>Append</button>
        </div>

        <div>
          <button className="btn" onClick={this.handleMultipleAppend}>Multiple Append</button>
        </div>

        <div />

        <div>
          <label>Duration</label>
          <Slider
            min={0}
            max={1000}
            value={duration}
            onChange={this.handleDurationChange}
          />
        </div>

        <div>
          <label>Column width</label>
          <Slider
            min={80}
            max={500}
            value={columnWidth}
            onChange={this.handleColumnWidthChange}
          />
        </div>

        <div>
          <label>Gutter</label>
          <Slider
            min={0}
            max={100}
            value={gutter}
            onChange={this.handleGutterChange}
          />
        </div>

        <div />

        <div>
          <label>Easing</label>
          <select value={easing} onChange={this.handleEasingChange}>
            {selectEasingOptions.map(o =>
              <option key={o.value} value={o.value}>{o.label}</option>
            )}
          </select>
        </div>

        <div>
          <label>Transition</label>
          <select value={transition} onChange={this.handleTransitionChange}>
            {selectTransitionOptions.map(o =>
              <option key={o.value} value={o.value}>{o.label}</option>
            )}
          </select>
        </div>
      </div>
    );
  }
}
