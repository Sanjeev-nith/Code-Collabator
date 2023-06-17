import React from "react";
import Wave from 'react-wavify';

const EditorConnection = () => {
    return(
        <div>
            <Wave 
                mask="url(#mask)"
                fill='#d18202'
                paused={false}
                options={{
                    height: 0.5,
                    amplitude: 30,
                    speed: 2,
                    points: 20
                }}
            >
                <defs>
                    <linearGradient id="gradient" gradientTransform="rotate(90)">
                        <stop offset="0" stopColor="white" />
                        <stop offset="0.5" stopColor="black" />
                    </linearGradient>
                    <mask id="mask">
                        <rect x="0" y="0" width="2000" height="90" fill="url(#gradient)"  />
                    </mask>
                </defs>
            </Wave>
        </div>
    )
};

export default EditorConnection;