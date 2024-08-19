// src/components/ImageUploader.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*', // فقط ملفات الصور
  });

  return (
    <div
      {...getRootProps({
        className: `dropzone ${isDragActive ? 'dropzone-active' : ''} ${isDragReject ? 'dropzone-reject' : ''}`,
      })}
    >
      <input {...getInputProps()} />
      <p>
        {isDragActive
          ? 'Drop the files here ...'
          : 'Drag and drop some files here, or click to select files'}
      </p>
    </div>
  );
};

// تحديد PropTypes للتحقق من صحة الخصائص
ImageUploader.propTypes = {
  onDrop: PropTypes.func.isRequired, // onDrop يجب أن يكون دالة
};

export default ImageUploader;
