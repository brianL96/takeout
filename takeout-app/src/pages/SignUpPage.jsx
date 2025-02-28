import React from 'react'

import SignUpFields from '../components/SignUpComponents/SignUpFields';

const SignUpPage = ({addBlock, addClient}) => {
    return (
        <>
            <SignUpFields addBlock={addBlock} addClient={addClient}/>
        </>
       
    );
}

export default SignUpPage;