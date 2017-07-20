/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import StackGrid, { transitions, easings } from '../../../src/';

const transition = transitions.scaleDown;

const images = [
  { src: './images/photos/photo01.jpg', label: 'Sample image 1' },
  { src: './images/photos/photo02.jpg', label: 'Sample image 2' },
  { src: './images/photos/photo03.jpg', label: 'Sample image 3' },
  { src: './images/photos/photo04.jpg', label: 'Sample image 4' },
  { src: './images/photos/photo05.jpg', label: 'Sample image 5' },
  { src: './images/photos/photo06.jpg', label: 'Sample image 6' },
  { src: './images/photos/photo07.jpg', label: 'Sample image 7' },
  { src: './images/photos/photo08.jpg', label: 'Sample image 8' },
  { src: './images/photos/photo09.jpg', label: 'Sample image 9' },
  { src: './images/photos/photo10.jpg', label: 'Sample image 10' },
  { src: './images/photos/photo11.jpg', label: 'Sample image 11' },
  { src: './images/photos/photo12.jpg', label: 'Sample image 12' },
  { src: './images/photos/photo13.jpg', label: 'Sample image 13' },
  { src: './images/photos/photo14.jpg', label: 'Sample image 14' },
  { src: './images/photos/photo15.jpg', label: 'Sample image 15' },
  { src: './images/photos/photo16.jpg', label: 'Sample image 16' },
  { src: './images/photos/photo17.jpg', label: 'Sample image 17' },
  { src: './images/photos/photo18.jpg', label: 'Sample image 18' },
  { src: './images/photos/photo19.jpg', label: 'Sample image 19' },
  { src: './images/photos/photo20.jpg', label: 'Sample image 20' },
  { src: './images/photos/photo21.jpg', label: 'Sample image 21' },
  { src: './images/photos/photo22.jpg', label: 'Sample image 22' },
];


export default class RealWorld extends Component {
  render() {
    return (
      <StackGrid
        monitorImagesLoaded
        columnWidth={300}
        duration={600}
        gutterWidth={15}
        gutterHeight={15}
        easing={easings.cubicOut}
        appearDelay={60}
        appear={transition.appear}
        appeared={transition.appeared}
        enter={transition.enter}
        entered={transition.entered}
        leaved={transition.leaved}
      >
        {images.map(obj =>
          (<figure
            key={obj.src}
            className="image"
          >
            <img src={obj.src} alt={obj.label} />
            <figcaption>{obj.label}</figcaption>
          </figure>)
        )}
      </StackGrid>
    );
  }
}
