import React, { useState, useRef, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../../Actions';
import Client from '../../components/Client';
import { initSocket } from '../../helpers/socket';
import {
    useLocation,
    useNavigate,
    useParams,
    Navigate
} from 'react-router-dom';
import SplitPane from 'react-split-pane';
import './MeetingPage.css'
import UserContext from '../../context/UserContext';
import RealTimeEditor from './components/RealTimeEditor';
import { cppCode } from '../../helpers/baseCode';

const MeetingPage = () => {
    const socketRef = useRef(null);
    const [code, setCode] = useState(cppCode);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const location = useLocation();
    const {user} = useContext(UserContext);
    const { meetingId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                meetingId,
                username: user.name,
            });

            // Listening for joined event
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== user.name) {
                        toast.success(`${username} joined the meeting.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: code,
                        socketId,
                    });
                }
            );

            // Listening for disconnected
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the meeting.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    }, [reactNavigator, meetingId, user]);

    async function copyMeetingId() {
        try {
            // await navigator.clipboard.writeText(meetingId);
            var textField = document.createElement('textarea');
            textField.innerText = `${meetingId}`;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand('copy');
            textField.remove();
            toast.success('Meeting ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Meeting ID');
            console.error(err);
        }
    }

    function leaveMeeting() {
        reactNavigator('/');
    }

    if (!location.state || !user.name) {
        return <Navigate to="/" />;
    }

    return (
            <SplitPane 
                split="vertical" 
                minSize={200} 
                defaultSize={300}
                maxSize={500}
                className="mainWrap"
            >
                <div className="aside">
                    <div className="asideInner">
                        <h3 style={{'textAlign': 'center', 'padding': '0px', 'margin':'0px'}}>Connected {`(${clients.length})`}</h3>
                        <div className="clientsList">
                            {clients.map((client) => (
                                <Client
                                    key={client.socketId}
                                    username={client.username}
                                />
                            ))}
                        </div>
                    </div>
                    <button className="btn loginBtn" onClick={copyMeetingId}>
                        Copy MEETING ID
                    </button>
                    <button className="btn leaveBtn" onClick={leaveMeeting}>
                        Leave
                    </button>
                </div>
                <RealTimeEditor 
                    socketRef={socketRef}
                    meetingId={meetingId}
                    onCodeChange={(code) => {
                        setCode(code);
                    }}
                    code={code}
                    input={input}
                    onInputChange={(input) => {
                        setInput(input);
                    }}
                    output={output}
                    setOutput={setOutput}
                />
            </SplitPane>
    );
};

export default MeetingPage;
