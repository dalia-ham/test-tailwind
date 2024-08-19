import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Image, Transformer } from 'react-konva';
import { useFormik } from 'formik';

const MM_TO_PX = 3.7795275591; // Conversion factor from mm to px

const sizes = {
  A4: { width: 297, height: 210 },
  A3: { width: 420, height: 297 },
  A2: { width: 594, height: 420 }
};

const fonts = [
  'Arial',
  'Courier New',
  'Georgia',
  'Times New Roman',
  'Verdana',
  'Comic Sans MS',
  'Impact',
  'Trebuchet MS',
  'Lucida Console'
];

const CertificateEditor = () => {
  const [textItems, setTextItems] = useState([]);
  const [imageItems, setImageItems] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedFontSize, setSelectedFontSize] = useState(20);
  const [selectedFontFamily, setSelectedFontFamily] = useState('Arial');
  const [selectedFontWeight, setSelectedFontWeight] = useState('normal');
  const [selectedFontStyle, setSelectedFontStyle] = useState('normal');
  const [selectedSize, setSelectedSize] = useState('A4');
  const [scale, setScale] = useState(1);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const stageRef = useRef(null);
  const transformerRef = useRef(null);

  // Load background image
  useEffect(() => {
    const img = new window.Image();
    img.src = '/cer.png'; // Path to your background image
    img.onload = () => setBackgroundImage(img);
    img.onerror = () => console.error('Failed to load image');
  }, []);

  // Formik form for text input
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      const stage = stageRef.current;
      const pointerPosition = stage.getPointerPosition();

      if (selectedTextId) {
        // Update existing text item
        setTextItems((items) =>
          items.map((item) =>
            item.id === selectedTextId
              ? { ...item, text: values.text, fill: selectedColor, fontSize: selectedFontSize, fontFamily: selectedFontFamily, fontWeight: selectedFontWeight, fontStyle: selectedFontStyle }
              : item
          )
        );
        setSelectedTextId(null);
      } else {
        // Add new text item
        const newItem = {
          id: Date.now(),
          text: values.text,
          x: (pointerPosition.x / scale),
          y: (pointerPosition.y / scale),
          fontSize: selectedFontSize,
          fill: selectedColor,
          fontFamily: selectedFontFamily,
          fontWeight: selectedFontWeight,
          fontStyle: selectedFontStyle,
        };
        setTextItems([...textItems, newItem]);
      }
      formik.resetForm();
    },
  });

  // Handle text click for editing
  const handleTextClick = (id) => {
    const selectedItem = textItems.find((item) => item.id === id);
    formik.setFieldValue('text', selectedItem.text);
    setSelectedTextId(id);
    setSelectedColor(selectedItem.fill);
    setSelectedFontSize(selectedItem.fontSize);
    setSelectedFontFamily(selectedItem.fontFamily);
    setSelectedFontWeight(selectedItem.fontWeight);
    setSelectedFontStyle(selectedItem.fontStyle);
  };

  // Handle drag end event
  const handleDragEnd = (id, e) => {
    const { x, y } = e.target.position();
    setTextItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, x: x / scale, y: y / scale } : item
      )
    );
  };

  // Handle text delete
  const handleDelete = (id) => {
    setTextItems(textItems.filter((item) => item.id !== id));
    setSelectedTextId(null);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        const stage = stageRef.current;
        const pointerPosition = stage.getPointerPosition();

        setImageItems((items) => [
          ...items,
          {
            id: Date.now(),
            image: img,
            x: (pointerPosition.x / scale),
            y: (pointerPosition.y / scale),
            width: 100,
            height: 100,
          },
        ]);
      };
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle image click for editing
  const handleImageClick = (id) => {
    setSelectedImageId(id);
  };

  // Handle image drag end event
  const handleImageDragEnd = (id, e) => {
    const { x, y } = e.target.position();
    setImageItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, x: x / scale, y: y / scale } : item
      )
    );
  };

  // Handle image size change
  const handleImageResize = (id, width, height) => {
    setImageItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, width, height } : item
      )
    );
  };

  // Handle scale change
  const handleScaleChange = (scaleChange) => {
    setScale((prevScale) => Math.max(0.1, Math.min(3, prevScale + scaleChange)));
  };

  // Save the canvas as an image
  const handleSave = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.href = uri;
    link.download = 'certificate.png';
    link.click();
  };

  // Vertical offset for background image
  const backgroundOffsetY = 50; // Adjust this value to move the image down

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Text Editor</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="text"
            placeholder="Enter text"
            value={formik.values.text}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded hover:bg-blue-600"
          >
            {selectedTextId ? 'Update Text' : 'Add Text'}
          </button>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Color:</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Font Size:</label>
            <select
              value={selectedFontSize}
              onChange={(e) => setSelectedFontSize(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {[12, 16, 20, 24, 30, 36, 48, 60].map(size => (
                <option key={size} value={size}>{size}px</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Font Family:</label>
            <select
              value={selectedFontFamily}
              onChange={(e) => setSelectedFontFamily(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {fonts.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Font Weight:</label>
            <select
              value={selectedFontWeight}
              onChange={(e) => setSelectedFontWeight(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="bolder">Bolder</option>
              <option value="lighter">Lighter</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Font Style:</label>
            <select
              value={selectedFontStyle}
              onChange={(e) => setSelectedFontStyle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
              <option value="oblique">Oblique</option>
            </select>
          </div>
        </form>

        <h2 className="text-xl font-semibold mt-6 mb-4"></h2>
        <label className="w-full flex justify-center items-center border border-gray-300 rounded p-2 cursor-pointer bg-green-800 hover:bg-yellow-600">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <span className="text-white-700">Upload Image</span>
        </label>

        <h2 className="text-xl font-semibold mt-6 mb-4"> </h2>
        <div className="flex space-x-4">
          <button
            onClick={() => handleScaleChange(0.1)}
            className="bg-green-800 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Zoom In +
          </button>
          <button
            onClick={() => handleScaleChange(-0.1)}
            className="bg-green-800 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Zoom Out -
          </button>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-green-800 text-white py-2 mt-4 rounded hover:bg-green-700"
        >
          Save Certificate
        </button>
      </div>

      {/* Canvas area */}
      <div className="flex-1 p-4">
        <Stage
          width={sizes[selectedSize].width * MM_TO_PX * scale}
          height={sizes[selectedSize].height * MM_TO_PX * scale}
          ref={stageRef}
          className="border border-gray-300"
          scaleX={scale}
          scaleY={scale}
        >
          <Layer>
            {backgroundImage && (
              <Image
                image={backgroundImage}
                x={(sizes[selectedSize].width * MM_TO_PX * scale - sizes[selectedSize].width * MM_TO_PX) / 2}
                y={((sizes[selectedSize].height * MM_TO_PX * scale - sizes[selectedSize].height * MM_TO_PX) / 2) + backgroundOffsetY}
                width={sizes[selectedSize].width * MM_TO_PX}
                height={sizes[selectedSize].height * MM_TO_PX}
              />
            )}
          </Layer>
          <Layer>
            {textItems.map((item) => (
              <Text
                key={item.id}
                text={item.text}
                x={item.x}
                y={item.y}
                fontSize={item.fontSize}
                fill={item.fill}
                fontFamily={item.fontFamily}
                fontWeight={item.fontWeight}
                fontStyle={item.fontStyle}
                draggable
                onClick={() => handleTextClick(item.id)}
                onDragEnd={(e) => handleDragEnd(item.id, e)}
              />
            ))}
            {imageItems.map((item) => (
              <React.Fragment key={item.id}>
                <Image
                  image={item.image}
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  draggable
                  onClick={() => handleImageClick(item.id)}
                  onDragEnd={(e) => handleImageDragEnd(item.id, e)}
                />
                {selectedImageId === item.id && (
                  <Transformer
                    ref={transformerRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      handleImageResize(item.id, newBox.width, newBox.height);
                      return newBox;
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CertificateEditor;
