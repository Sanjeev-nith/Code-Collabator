import React from "react";

const GetStartedButton = ({setShowLoginModal}) => {
    return (
        <div style={{'width':'100%', 'textAlign':'center','marginTop':'20px'}}>
            <button className='btn loginBtn getStartedBtn' onClick={() => setShowLoginModal(true)}>
                Get Started
            </button>
        </div>
    )
};

export default GetStartedButton;