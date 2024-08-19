// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const CanvasEditor = () => {
  const [shapes, setShapes] = useState([]);

  const addRectangle = () => {
    setShapes([
      ...shapes,
      {
        id: shapes.length + 1,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: 'red',
      },
    ]);
  };

  return (
    <div>
      <button onClick={addRectangle}>Add Rectangle</button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {shapes.map((shape) => (
            <Rect
              key={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              draggable
            />
          ))}
          {/* إضافة عنصر Text إلى اللوحة */}
          <Text text="Hello, Konva!" x={50} y={10} fontSize={24} fill="black" />
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasEditor;
