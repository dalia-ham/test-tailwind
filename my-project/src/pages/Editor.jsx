// src/components/Editor.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import ImageUploader from './ImageUploader'; // تأكد من صحة المسار

const Editor = () => {
  const [image, setImage] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const exportImage = () => {
    html2canvas(document.querySelector('.editor')).then((canvas) => {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'my-design.png';
      link.click();
    });
  };

  return (
    <div className="editor" style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h1>Editor Component</h1>
      <ImageUploader onDrop={handleDrop} />
      {image ? (
        <div>
          <img src={image} alt="Uploaded" className="uploaded-image" style={{ maxWidth: '100%' }} />
          <button onClick={exportImage} className="export-button" style={{ marginTop: '20px' }}>
            Export Image
          </button>
        </div>
      ) : (
        <p>No image uploaded yet.</p>
      )}
    </div>
  );
};

export default Editor;
