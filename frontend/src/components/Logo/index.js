import React from "react";
import TypeAnimation from 'react-type-animation';
import './Logo.css';

const Logo = () => {
    return (
        <div className='logoContainer'>
            <img
                src="/code-sync.png"
                alt="code-sync-logo"
                className='logo'
            />
            <div>
                <h4 
                    className='logoText appName'
                >Code-Collab</h4>
                <TypeAnimation
                    cursor={true}
                    sequence={[
                    'Real-time Code Collaboration',
                    2000,
                    'Conduct Coding Interviews',
                    2000,
                    'BrainStorm on coding problems',
                    2000,
                    ]}
                    wrapper="a"
                    repeat={Infinity}
                    className='logoText'
                />
            </div>
        </div>
    )
};

export default Logo;