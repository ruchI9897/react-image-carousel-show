# Simple Image Carousel Library


A simple and customizable image carousel component library for React.

## Features

- Easy to use and integrate.
- Fully customizable.
- Supports automatic slide transitions.

## Installation

You can install the package using npm or yarn:

```bash
npm install react-image-carousel

or 

yarn add react-image-carousel

```

## Usage

Here's a basic example of how to use the ImageCarousel component in your React project:

### 1. Import the Component
First, import the ImageCarousel component into your project:

```bash

import React from 'react';
import ImageCarousel from 'react-image-carousel';
import 'react-image-carousel/dist/index.css'; 

```

### 2. Use the Component
Then, use the ImageCarousel component and pass the required props:

```bash

const images = [
  'https://via.placeholder.com/800x300',
  'https://via.placeholder.com/800x300', 
  'https://via.placeholder.com/800x300',
];

const App = () => {
  return (
    <div>
      <h1>React Image Carousel Example</h1>
      <ImageCarousel images={images} autoPlay={true} animation={"default"} />
    </div>
  );
};

export default App;

```

## Props

| Name                    |                                                                        Type                                                                        |              Default              | Description                                                                                                                                                           |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| images              |                                                                      `Array`                                                                      |               `[]`                | Array of images                                                                                                                          |
| itemWidth              |                                                                      `number`                                                                      |               `''`                | Image Width                                                                    |
| itemHeight                     |                                                                     `number`                                                                      |              `false`              | Image Height                                                                                                                |
| animation           |                                                                      `string`                                                                      |                `default`                | Image Slide Animation                                                                                                                                             |
| autoPlay               |                                                                     `boolean`                                                                      |              `false`               | Auto playing of Images                                                                                                                         |
| loop               |                                                                     `boolean`                                                                      |              `true`               | Loop over the Images                                                                                                                           |
| dotStyle                  |                                                                     `style`                                                                      |              `{}`               | Nav Dot Style                                                                                                                                          |
| navDotsContainerStyle                  |                                                                     `style`                                                                      |              `{}`               | Nav Dot Container Style                                                                                                                                          |
| imageContainerStyle |                                                                 `string`                                                                  |               `{}`                | Image Container Style Prop |
| imagePropsStyle         |                                                                       `style`                                                                        |              `{}`               | Each image Style Prop                                                                                                                              |
| buttonContainerStyle        |                                                                       `style`                                                                        |              `{}`               | Previous & Next Button Container Style Prop                                                                                                                               |
| leftButtonStyle               |                                                                       `style`                                                                        |               `{}`                | Previous Button Style Prop                                                                                                                                |
| rightButtonStyle       |                                                                       `style`                                                                        |               `{}`                | Next Button Style Prop                                                                                       |
| onImageLoad                |                                                                     `function`                                                                      |               `null`               | A Callback called after Image Load                                                                                                                                                         |
| onLeftBtnPress        |                                                                      `function`                                                                      |               `null`                | A Callback on Left Button Press                                                                                            |
| onRightBtnPress             |                                                                     `function`                                                                     |              `null`               | A Callback on Right Button Press.                                                                                                                                   |
| autoPlayDuration            |                                                                     `number`                                                                     |              `5000`               | Auto Play animation Duration in ms                                                                                                                                  |
| fadeInEffectDuration             |                                                                      `number`                                                                      |  `3000`   | Fade In Animation Duration in ms                                                                                                |
| activeNavDotWidth               |                                                                      `number`                                                                      |               `10`                | Active Nav Dot Width                                                 |
| nonActiveNavDotWidth          |                                                                      `number`                                                                      |   `5`   | Non Active Nav Dot Width                         |
| activeNavDotColor            |                                                                      `string`                                                                      | `#ffff` | Active Nav Dot Color                                                                                                                                       |
| nonActiveNavDotColor         |                                                                     `string`                                                                      |              `grey`               | Non Active Nav Dot Color                                                                                                                       |
| imageCarouselContainerStyle                |                                                                     `style`                                                                      |              `{}`              | Image Carousel Container Style  
| showVerticalScrollBar                |                                                                     `boolean`                                                                      |              `true`              | Show Scroll Bar                                                                                                                                                             
