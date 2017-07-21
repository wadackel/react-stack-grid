/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import StackGrid from '../../../src/';


const items = [];

for (let i = 0; i < 30; i += 1) {
  const id = Math.random().toString(36).substr(2, 9);
  const height = Math.floor((Math.random() * (300 - 80)) + 80);

  items.push({
    id,
    height,
    active: false,
    actualHeight: height,
  });
}


export default class ChangeSize extends Component {
  state = { items };

  changeItemSize = (id) => {
    this.setState({
      items: this.state.items.map(o => (
        o.id !== id ? o : {
          ...o,
          active: !o.active,
          height: !o.active ? o.height * 1.5 : o.actualHeight,
        }
      )),
    }, () => {
      this.grid.updateLayout();
    });
  };

  render() {
    return (
      <StackGrid
        gridRef={grid => this.grid = grid}
        columnWidth={120}
      >
        {this.state.items.map(({ id, active, height }) => (
          <div
            key={id}
            style={{
              transition: 'background 200ms ease-out',
              background: active ? '#c9cae3' : '#dfe0df',
              height,
            }}
            onClick={() => this.changeItemSize(id)}
          />
        ))}
      </StackGrid>
    );
  }
}
