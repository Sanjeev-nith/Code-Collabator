import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Navbar from '../../components/Navbar';
import CreateNewMeetingButton from './components/CreateNewMeetingButton';
import JoinMeetingForm from './components/JoinMeetingForm';
import GreetUser from './components/GreetUser';

const Home = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    console.log(user);
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        toast.success('Created a new meeting!');
        joinRoom(id);
    };

    const joinRoom = (roomIdArg) => {
        if (!roomIdArg.length) {
            toast.error('MEETING ID is required');
            return;
        }

        // Redirect
        navigate(`/editor/${roomIdArg}`, {
            state: {
                username,
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom(roomId);
        }
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <Navbar />
                <GreetUser />
                <h4 className="mainLabel">Join Existing Meeting</h4>
                <div className="inputGroup">
                    <JoinMeetingForm 
                        setRoomId={setRoomId}
                        roomId={roomId}
                        handleInputEnter={handleInputEnter}
                        joinRoom={joinRoom}
                    />
                    <h4 className='createInfo'>OR</h4>
                    <CreateNewMeetingButton createNewRoom={createNewRoom} />
                </div>
            </div>
        </div>
    );
};

export default Home;
