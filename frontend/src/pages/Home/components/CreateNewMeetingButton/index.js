import React from "react";

const CreateNewMeetingButton = ({createNewRoom}) => {
    return <button
        onClick={createNewRoom}
        className="btn createNewBtn"
    >
        Create New Meeting
    </button>
}

export default CreateNewMeetingButton;