// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import MyForm from '../components/Form2';

function form2() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams(); 

  return (
    <>
      <MyForm />
      <p> {id}</p> {}
    </>
  );
}

export default form2;