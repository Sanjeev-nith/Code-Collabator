import React from "react";
import { SpinnerRoundFilled } from 'spinners-react';
import './Spinner.css'

const Spinner = () => {
    return (
        <div className="spinnerContainer">
            <SpinnerRoundFilled size={150}/>
        </div>
    )
};

export default Spinner;