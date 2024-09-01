// CertificateDesigner.jsx
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import html2canvas from 'html2canvas';

import QRCode from 'qrcode.react';
import { FaTextHeight, FaImages, FaQrcode, FaFileImage } from 'react-icons/fa';
import { BsZoomIn, BsZoomOut } from 'react-icons/bs';
import InstitutionsDialog from './InstitutionsDialog';

const CertificateDesigner = () => {
  const [textElements, setTextElements] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [scale, setScale] = useState(1);
  const [logo, setLogo] = useState(null);
  const [qrCodeText, setQrCodeText] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [editingTextIndex, setEditingTextIndex] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState('24px');
  const [color, setColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const certificateAreaRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);

  const handleAddText = () => {
    if (textInput) {
      const yPosition = 50; 
      const xPosition = textElements.reduce((totalWidth, element) => {
        return totalWidth + element.width;
      }, 50); 
  
      setTextElements([
        ...textElements,
        {
          text: textInput,
          fontSize,
          color,
          fontFamily,
          fontWeight,
          fontStyle,
          x: xPosition,
          y: yPosition,
          width: 200, // يمكن ضبط عرض النص حسب الحاجة
        },
      ]);
      setTextInput('');
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
    if (certificateAreaRef.current && selectedInstitutions.length > 0) {
        const certificateArea = certificateAreaRef.current;

        // تحديد أبعاد وإحداثيات المربع الذي نريد حفظه
        const rect = certificateArea.getBoundingClientRect();
        const scale = window.devicePixelRatio; // للتأكد من دقة الصورة على الشاشات عالية الدقة

        html2canvas(certificateArea, {
            scale: scale, // لتحسين جودة الصورة
            useCORS: true, 
            logging: false,
            scrollX: -window.scrollX, // منع تأثير التمرير
            scrollY: -window.scrollY
        }).then(canvas => {
            canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append('template_photo', blob);
                formData.append('institutions_id', JSON.stringify(selectedInstitutions));

                fetch('http://localhost/certificate/save_template.php', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Template saved successfully');
                    } else {
                        alert('Error saving template');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error saving template');
                });
            }, 'image/jpeg');
        });
    } else {
        alert('Please select institutions before saving the certificate.');
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
      setEditingTextIndex(null);
      setTextInput('');
    }
  };

  const handleAreaClick = (e) => {
    if (e.target === e.currentTarget && editingTextIndex === null) {
      setTextElements([
        ...textElements,
        { text: 'New Text', fontSize: '24px', color: '#000000', fontFamily: 'Arial', fontWeight: 'normal', fontStyle: 'normal', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
      ]);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogApply = (selectedInstitutions) => {
    setSelectedInstitutions(selectedInstitutions);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-white shadow-lg flex flex-col justify-between">
      <div className="flex items-center space-x-3 mb-4">
          <FaFileImage size={20} />
          <h2 className="text-lg font-semibold">Templates</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[ './cer02.jpg', './cer03.jpg', './cr3.jpg' , './cer06.jpg'].map((template, index) => (
            <div
              key={index}
              className={`border-2 p-2 rounded cursor-pointer ${selectedTemplate === template ? 'border-blue-900' : 'border-gray-300'}`}
              onClick={() => setSelectedTemplate(template)}
            >
              <img src={template} alt={`Template ${index + 1}`} className="w-full"/>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-3 mt-6 mb-4">
          <FaTextHeight size={20} />
          <h2 className="text-lg font-semibold">Text Options</h2>
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

        {/* Color Picker and Font Options */}

        <label className="block mb-2">Select Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-5 mb-4 rounded"
        />

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
            <option value="Verdana">Verdana</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>

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
            <option value="36px">36px</option>
            <option value="48px">48px</option>
            <option value="60px">60px</option>
            <option value="72px">72px</option>
            <option value="84px">84px</option>
            <option value="96px">96px</option>
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
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
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
            <option value="oblique">Oblique</option>
          </select>
        </div>

        {/* QR Code Section */}
        <div className="flex items-center space-x-3 mt-6 mb-4">
          <FaQrcode size={20} />
          <h2 className="text-lg font-semibold">QR Code</h2>
        </div>
        <div className="">
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

          {/* Upload Logo Section */}
          <div className="flex items-center space-x-3 mt-8 mb-4">
          <FaImages size={20} />
          <h2 className="text-lg font-semibold">Upload Logo</h2>
        </div>
        <input type="file" onChange={handleLogoUpload} className="mb-4" />

         {/* Zoom Controls */}
         <div className="flex items-center space-x-3 mt-4">
          <BsZoomIn size={20} />
          <h2 className="text-lg font-semibold">Zoom</h2>
        </div>
        <div className="flex justify-between  ">
          <button
            className="bg-green-700 text-white p-4 w-1/2 mx-2 rounded mt-8"
            onClick={() => handleZoom('out')}
          >
            Zoom In
          </button>
          <button
            className="bg-green-700 text-white p-4 w-1/2 mx-2 rounded mt-8"
            onClick={() => handleZoom('in')}
          >
            Zoom Out
          </button>
        </div>


        
        <div className="flex justify-between mt-8 ">
          <button className="w-full bg-green-700 text-white p-2 mb-8 rounded" onClick={handleDialogOpen}>
            Select Institutions
          </button>
          
          {/* Other controls for text options, QR code, logo upload, zoom, etc. */}
        </div>
        
        <button
          className="w-full bg-green-700 text-white p-2 rounded"
          onClick={handleSaveCertificate}
        >
          Save Certificate
        </button>
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
          {/* Render text elements, logo, and QR code */}
        </div>
      </div>
      
      <InstitutionsDialog
        open={openDialog}
        onClose={handleDialogClose}
        onApply={handleDialogApply}
      />
    </div>
  );
};

export default CertificateDesigner;
