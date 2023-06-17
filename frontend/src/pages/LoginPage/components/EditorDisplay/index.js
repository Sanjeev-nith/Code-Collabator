import React, { useState } from 'react';
import { cppCode } from '../../../../helpers/baseCode';
import CodeMirrorEditor from '../CodeMirrorEditor/CodeMirrorEditor';
import EditorConnection from '../EditorConnection/EditorConnection';
import './EditorDisplay.css'

const EditorDisplay = () => {

    const [code, setCode] = useState(cppCode);

    return (
        <div className='editorDisplay'>
            <div className='codeMirrorEditor'>
                <h6 className='coderText'>Developer A</h6>
                <CodeMirrorEditor onCodeChange={setCode} code={code}/>
            </div>
            <div>
                <EditorConnection/>
            </div>
            <div className='codeMirrorEditor'>
                <h6 className='coderText'>Developer B</h6>
                <CodeMirrorEditor onCodeChange={setCode} code={code}/>
            </div>
        </div>
    )
}

export default EditorDisplay;