// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import ContentForm from '../components/Form2';

function Integrations() {
    const { id } = useParams(); // Get the ID from the URL

    return (
        <>
            <ContentForm id={id} /> {/* Pass the ID as a prop */}
        </>
    );
}

export default Integrations;
