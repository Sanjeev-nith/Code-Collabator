import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import Navbar from '../../components/Navbar';
import EditorDisplay from './components/EditorDisplay';
import GetStartedButton from './components/GetStartedButton';
import './LoginPage.css';

const LoginPage = () => {

    const [showLoginModal, setShowLoginModal] = useState(false);

    const renderLoginModal = () => {
        if(showLoginModal) {
            return <Modal 
                show={showLoginModal}
                setShowLoginModal={setShowLoginModal}
            >
                <h1>Let's Get Started!</h1>
                <a
                    className='btn loginBtn googleBtn'
                    href='/api/auth/google'
                >
                    Sign In With Google
                </a>
                <div style={{'height':'30px'}}></div>
            </Modal>
        }
    }

    return (
        <div className="homePageWrapper">
            <div>
                {renderLoginModal()}
                <Navbar />
                <div className='loginPageBody'>
                    <EditorDisplay/>
                </div>
                <GetStartedButton setShowLoginModal={setShowLoginModal}/>
            </div>
        </div>
    )
};

export default LoginPage;