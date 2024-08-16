// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [canvasRef, setCanvasRef] = useState(null);

  const handleGenerate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillText(`شهادة باسم ${name}`, 10, 50);

    // ... المزيد من الكود لرسم عناصر الشهادة الأخرى

    // حفظ الشهادة كصورة
    const link = document.createElement('a');
    link.download = 'certificate.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <input type="text" placeholder="أدخل الاسم" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleGenerate}>توليد الشهادة</button>
      <canvas ref={setCanvasRef} width="300" height="200"></canvas>
    </div>
  );
}

export default App;