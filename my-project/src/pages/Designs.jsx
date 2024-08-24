/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd'; // مكتبة لتحريك وتغيير حجم العناصر
import html2canvas from 'html2canvas'; // مكتبة لحفظ الصورة كـ JPG
import QRCode from 'qrcode.react'; // مكتبة لإنشاء رموز QR

const CertificateDesigner = () => {
  const [textElements, setTextElements] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [scale, setScale] = useState(1);
  const [logo, setLogo] = useState(null);
  const [qrCodeText, setQrCodeText] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [editingTextIndex, setEditingTextIndex] = useState(null); // للحالة التي يتم فيها تحرير نص
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState('24px');
  const [color, setColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const certificateAreaRef = useRef(null); // المرجع لمنطقة الشهادة

  const handleAddText = () => {
    if (textInput) {
      setTextElements([
        ...textElements,
        { text: textInput, fontSize, color, fontFamily, fontWeight, fontStyle, x: 50, y: 50 }
      ]);
      setTextInput(''); // Clear input after adding
    }
  };

  const handleZoom = (inOrOut) => {
    setScale(prevScale => (inOrOut === 'in' ? prevScale + 0.1 : Math.max(prevScale - 0.1, 0.1)));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQRCodeTextChange = (e) => {
    setQrCodeText(e.target.value);
    setShowQRCode(e.target.value.trim() !== '');
  };

  const handleSaveCertificate = () => {
    if (certificateAreaRef.current) {
      html2canvas(certificateAreaRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = 'certificate.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
      });
    }
  };

  const handleTextClick = (index) => {
    if (editingTextIndex === null) {
      setEditingTextIndex(index);
      const element = textElements[index];
      setTextInput(element.text);
      setFontSize(element.fontSize);
      setColor(element.color);
      setFontFamily(element.fontFamily);
      setFontWeight(element.fontWeight);
      setFontStyle(element.fontStyle);
    }
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleUpdateText = () => {
    if (editingTextIndex !== null) {
      const updatedTextElements = textElements.map((element, index) =>
        index === editingTextIndex
          ? { ...element, text: textInput, fontSize, color, fontFamily, fontWeight, fontStyle }
          : element
      );
      setTextElements(updatedTextElements);
      setEditingTextIndex(null); // Deselect text after update
      setTextInput(''); // Clear input
    }
  };

  const handleAreaClick = (e) => {
    if (e.target === e.currentTarget && editingTextIndex === null) {
      // Add new text element on click if no text is being edited
      setTextElements([
        ...textElements,
        { text: 'New Text', fontSize: '24px', color: '#000000', fontFamily: 'Arial', fontWeight: 'normal', fontStyle: 'normal', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
      ]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-white shadow-lg flex flex-col justify-between">
        {/* Template Selection and Text Options */}
        <div>
          <h1 className="text-lg font-bold mb-4">Your Design</h1>
          <hr className="mb-4" />
          <h2 className="text-lg mb-4">Select a Template</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Replace with your template images */}
            {['certificate1.jpg', 'cr2.jpg', 'cr3.jpg', 'cr4.jpg'].map((template, index) => (
              <div
                key={index}
                className={`border-2 p-2 rounded cursor-pointer ${selectedTemplate === template ? 'border-blue-900' : 'border-gray-300'}`}
                onClick={() => setSelectedTemplate(template)}
              >
                <img src={template} alt={`Template ${index + 1}`} className="w-full"/>
              </div>
            ))}
          </div>
          <input
            id="text-input"
            type="text"
            placeholder="Enter text"
            value={textInput}
            onChange={handleTextInputChange}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            className="w-full bg-green-700 text-white p-2 mb-4 rounded"
            onClick={editingTextIndex === null ? handleAddText : handleUpdateText}
          >
            {editingTextIndex === null ? 'Add Text' : 'Update Text'}
          </button>

          <label className="block mb-2">Select Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-5 mb-4 rounded"
          />
          
          <div className="mb-4">
            <label className="block mb-2">Font Size:</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="24px">24px</option>
              <option value="18px">18px</option>
              <option value="16px">16px</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Font Family:</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Font Weight:</label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="light">Light</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Font Style:</label>
            <select
              value={fontStyle}
              onChange={(e) => setFontStyle(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
            </select>
          </div>

          {/* QR Code Section */}
          <div className="mb-4">
            <label className="block mb-2">QR Code Text:</label>
            <input
              type="text"
              placeholder="Enter text for QR Code"
              value={qrCodeText}
              onChange={handleQRCodeTextChange}
              className="w-full p-2 mb-4 border rounded"
            />
            {showQRCode && (
              <QRCode value={qrCodeText} size={100} />
            )}
          </div>
          
          <label className="block mb-2">Upload Logo:</label>
          <input type="file" onChange={handleLogoUpload} className="mb-4" />
          
          <button
            className="w-full bg-green-700 text-white p-2 rounded"
            onClick={handleSaveCertificate}
          >
            Save Certificate
          </button>

          {/* Zoom Controls */}
          <div className="flex justify-between mt-4">
            <button
              className="bg-green-700 text-white p-4 w-1/2 mx-2 rounded"
              onClick={() => handleZoom('in')}
            >
              Zoom Out
            </button>
            <button
              className="bg-green-700 text-white p-4 w-1/2 mx-2 rounded"
              onClick={() => handleZoom('out')}
            >
              Zoom In
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Area */}
      <div
        className="flex-1 flex justify-center items-center p-4"
        onClick={handleAreaClick}
        ref={certificateAreaRef}
      >
        <div
          id="certificate-area"
          className="relative border border-gray-400 bg-white"
          style={{ width: '800px', height: '600px', transform: `scale(${scale})` }}
        >
          {selectedTemplate && (
            <img
              src={selectedTemplate}
              alt="Certificate Template"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}
          {logo && (
            <Rnd
              default={{
                x: 10,
                y: 10,
                width: 100,
                height: 100
              }}
              bounds="parent"
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: '100%', height: 'auto' }}
              />
            </Rnd>
          )}
          {textElements.map((element, index) => (
            <Rnd
              key={index}
              default={{
                x: element.x,
                y: element.y,
                width: 200,
                height: 50
              }}
              bounds="parent"
              onDragStop={(e, d) => {
                const updatedElements = textElements.map((el, i) =>
                  i === index ? { ...el, x: d.x, y: d.y } : el
                );
                setTextElements(updatedElements);
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                const updatedElements = textElements.map((el, i) =>
                  i === index
                    ? {
                        ...el,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        x: position.x,
                        y: position.y,
                      }
                    : el
                );
                setTextElements(updatedElements);
              }}
            >
              <div
                className="absolute p-2 cursor-pointer"
                style={{
                  fontSize: element.fontSize,
                  color: element.color,
                  fontFamily: element.fontFamily,
                  fontWeight: element.fontWeight,
                  fontStyle: element.fontStyle,
                }}
                onClick={() => handleTextClick(index)}
              >
                {element.text}
              </div>
            </Rnd>
          ))}
          {showQRCode && (
            <Rnd
              default={{
                x: 10,
                y: 10,
                width: 100,
                height: 100
              }}
              bounds="parent"
            >
              <div className="absolute bottom-4 right-4">
                <QRCode value={qrCodeText} size={100} />
              </div>
            </Rnd>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateDesigner;
