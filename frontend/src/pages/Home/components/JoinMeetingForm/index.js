import React from "react";

const JoinMeetingForm = ({
    setRoomId,
    roomId,
    handleInputEnter,
    joinRoom
}) => {
    return (
        <>
            <input
                type="text"
                className="inputBox"
                placeholder="PASTE MEETING ID"
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
                onKeyUp={handleInputEnter}
            />
            <button className="btn joinBtn" onClick={() => joinRoom(roomId)}>
                Join
            </button>
        </>
    )
}

export default JoinMeetingForm;