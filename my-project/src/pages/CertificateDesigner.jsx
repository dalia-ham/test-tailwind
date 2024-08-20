// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

function Designs() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // إنشاء اللوحة (canvas) عند تحميل المكون
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,  // زيادة العرض ليتناسب مع المحتوى
      height: 600, // زيادة الارتفاع ليتناسب مع المحتوى
      backgroundColor: '#f3f3f3', // لون خلفية الشهادة
    });

    // إضافة نص افتراضي إلى الشهادة
    const text = new fabric.Text('شهادة تقدير', {
      left: 250,
      top: 100,
      fontSize: 40,
      fill: '#000',
      selectable: true, // النص قابل للتحريك والتعديل
    });
    canvas.add(text);

    // إضافة اسم المتسلم
    const recipientText = new fabric.Text('اسم المتسلم', {
      left: 250,
      top: 200,
      fontSize: 30,
      fill: '#000',
      selectable: true, // النص قابل للتحريك والتعديل
    });
    canvas.add(recipientText);

    // إضافة تاريخ الشهادة
    const dateText = new fabric.Text('التاريخ: 2024-08-16', {
      left: 250,
      top: 300,
      fontSize: 20,
      fill: '#000',
      selectable: true,
    });
    canvas.add(dateText);

    // إضافة وظيفة لتحميل صورة الخلفية (مثل شعار المؤسسة)
    const addImage = (url) => {
      fabric.Image.fromURL(url, (img) => {
        img.set({
          left: 50,
          top: 400,
          scaleX: 0.2,
          scaleY: 0.2,
        });
        canvas.add(img);
      });
    };

    addImage('https://via.placeholder.com/150');

    // تمكين الحفظ كصورة
    const saveCanvasAsImage = () => {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 0.8,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'certificate.png';
      link.click();
    };

    document.getElementById('save-btn').addEventListener('click', saveCanvasAsImage);
    
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className="p-4"> {/* إضافة مسافة داخلية عامة */}
      <h1 className="text-2xl font-bold mb-6">مصمم الشهادات</h1> {/* إضافة مسافة أسفل العنوان */}
      <canvas ref={canvasRef} id="canvas" className="border border-gray-300" />
      <button id="save-btn" className="bg-blue-500 text-white px-4 py-2 rounded mt-6"> {/* إضافة مسافة أعلى الزر */}
        حفظ الشهادة
      </button>
    </div>
  );
}

export default Designs;
