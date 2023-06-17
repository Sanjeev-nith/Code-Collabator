import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import Spinner from './pages/Spinner';
import axios from 'axios';
import MeetingPage from './pages/MeetingPage';

function App() {

    const [userExists, setUserExists] = useState(-1);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('/api/users/current_user');

            if(response.data.user) {
                setUserExists(1);
                setUser(response.data.user);
            } else {
                setUserExists(0);
            }
        }

        fetchUser();
    }, []);

    const renderRootRoute = () => {
        if(userExists === -1) {
            return <Spinner />;
        } else if(userExists === 0) {
            return <LoginPage />;
        } else {
            return <Home />;
        }
    }

    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <UserContext.Provider value={{user, setUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={renderRootRoute()}></Route>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route
                            path="/editor/:meetingId"
                            element={<MeetingPage />}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;
