// src/components/Canvas.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const Canvas = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={20}
          y={20}
          width={100}
          height={100}
          fill="red"
          draggable
        />
        <Text
          text="Hello, Konva!"
          x={150}
          y={20}
          fontSize={24}
          fill="black"
        />
      </Layer>
    </Stage>
  );
};

export default Canvas;
