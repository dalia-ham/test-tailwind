// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import MyForm from '../components/GroupForm';

function Pathways() {
  const { id } = useParams(); // استخدام useParams لالتقاط المعرف من الرابط

  return (
    <>
      <MyForm />
      <h1>Pathways Page</h1>
      <p>ID: {id}</p> {/* عرض المعرف */}
    </>
  );
}

export default Pathways;
