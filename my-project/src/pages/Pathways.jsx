// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import MyForm from '../components/GroupForm';

function Pathways() {
  const { id } = useParams(); 

  return (
    <>
      <MyForm />
      <p>{id}</p> {/* عرض المعرف */}
    </>
  );
}

export default Pathways;
