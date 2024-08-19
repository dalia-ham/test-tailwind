// src/Kanva.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

function Kanva() {
  const stageWidth = window.innerWidth;
  const stageHeight = window.innerHeight;

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Layer>
        <Rect
          x={50}
          y={50}
          width={stageWidth - 100}
          height={stageHeight - 100}
          fill="#f5f5f5"
          stroke="#ddd"
          strokeWidth={4}
          cornerRadius={10}
        />
        <Text
          x={100}
          y={100}
          text="Certificate of Achievement"
          fontSize={40}
          fontFamily="Arial"
          fill="black"
          width={stageWidth - 200}
          align="center"
        />
        <Text
          x={100}
          y={200}
          text="Awarded to: John Doe"
          fontSize={30}
          fontFamily="Arial"
          fill="black"
          width={stageWidth - 200}
          align="center"
        />
        <Text
          x={100}
          y={300}
          text="For exceptional performance in the course."
          fontSize={20}
          fontFamily="Arial"
          fill="black"
          width={stageWidth - 200}
          align="center"
        />
        <Text
          x={100}
          y={stageHeight - 150}
          text="Signature"
          fontSize={20}
          fontFamily="Arial"
          fill="black"
          width={stageWidth - 200}
          align="right"
        />
      </Layer>
    </Stage>
  );
}

export default Kanva;
