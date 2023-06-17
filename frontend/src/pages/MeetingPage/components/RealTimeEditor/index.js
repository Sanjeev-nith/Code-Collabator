import React, {useEffect, useState} from "react";
import {Controlled as CodeMirrorReact} from 'react-codemirror2';
import SplitPane from "react-split-pane";
import axios from 'axios';
import Select from "react-dropdown-select";
import ACTIONS from '../../../../Actions';
import { cppCode, javaCode, pythonCode } from "../../../../helpers/baseCode";
import { languages, JAVA, CPP } from "../../../../helpers/languages";
import 'codemirror';
import 'codemirror/lib/codemirror.css';
import './RealTimeEditor.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint.css";

const RealTimeEditor = ({socketRef, roomId, code, onCodeChange, input, onInputChange, output, setOutput}) => {

    const defaultOptions =  {
        mode: 'text/x-csrc',
        theme: 'tomorrow-night-bright',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        lineWrapping:true,
        matchBrackets: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        }
    };

    const [options, setOptions] = useState(defaultOptions);
    const [codeSubmissionState, setCodeSubmissionState] = useState(0);
    const [cppCodeState, setCppCodeState] = useState(cppCode);
    const [pythonCodeState, setPythonCodeState] = useState(pythonCode);
    const [javaCodeState, setJavaCodeState] = useState(javaCode);
    const [selectedLanguage, setSelectedLanguage] = useState([languages.find(language => language.label === CPP.label)]);

    
    const themes = [
        {label:'Dracula', value: 'dracula'},
        {label:'Blackboard', value: 'blackboard'},
        {label:'Ambiance', value: 'ambiance'},
        {label:'Cobalt', value: 'cobalt'},
        {label:'Material', value: 'material'},
        {label:'Eclipse', value: 'eclipse'},
        {label:'Twilight', value: 'twilight'},
        {label:'Tomorrow Night', value: 'tomorrow-night-bright'},
    ]

    const onSubmitButtonClick = async () => {
        setCodeSubmissionState(1);
        socketRef.current.emit(ACTIONS.CODE_SUBMISSION_STATE_CHANGE, {
            roomId,
            state: 1,
        });
        const response = await axios.post('/api/code/compile', {
            code: code,
            input: input,
            language: languages.find(language => language.value === options.mode).label
        });

        setCodeSubmissionState(0);
        socketRef.current.emit(ACTIONS.CODE_SUBMISSION_STATE_CHANGE, {
            roomId,
            state: 0,
        });

        setOutput(response.data.output);
        socketRef.current.emit(ACTIONS.OUTPUT_CHANGE, {
            roomId,
            output: response.data.output,
        });
    }

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    onCodeChange(code);
                }
            });
            socketRef.current.on(ACTIONS.INPUT_CHANGE, ({ input }) => {
                if (input !== null) {
                    onInputChange(input);
                }
            });
            socketRef.current.on(ACTIONS.OUTPUT_CHANGE, ({ output }) => {
                if (output !== null) {
                    setOutput(output);
                }
            });
            socketRef.current.on(ACTIONS.CODE_SUBMISSION_STATE_CHANGE, ({ state }) => {
                if (state !== null) {
                    setCodeSubmissionState(state);
                }
            });

            socketRef.current.on(ACTIONS.LANGUAGE_CHANGE, ({ mode }) => {
                console.log(mode);
                if (mode !== null) {
                    setOptions({...options, mode});
                    setSelectedLanguage([languages.find(language => language.value === mode)]);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
            socketRef.current.off(ACTIONS.INPUT_CHANGE);
            socketRef.current.off(ACTIONS.OUTPUT_CHANGE);
            socketRef.current.off(ACTIONS.CODE_SUBMISSION_STATE_CHANGE);
            socketRef.current.off(ACTIONS.LANGUAGE_CHANGE);
        };
    }, [onCodeChange, socketRef, onInputChange, setOutput, setOptions]);

    return(
        <div>
            <SplitPane
                split="horizontal" 
                minSize={400} 
                defaultSize={500}
                maxSize={600}
                className="mainWrap"
            >
                <div className="editorWrap">
                    <div className="editorBar">
                        <div className="editorBarButtonsDiv">
                            <Select 
                                options={languages} 
                                onChange={(values) => {
                                    const mode = values[0].value;
                                    const label = values[0].label; 
                                    let codeToChange;
                                    setOptions({...options, mode});
                                    if(label === CPP.label) {
                                        codeToChange = cppCodeState;
                                    } else if(label === JAVA.label) {
                                        codeToChange = javaCodeState;
                                    } else {
                                        codeToChange = pythonCodeState;
                                    }
                                    onCodeChange(codeToChange);
                                    socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
                                        roomId,
                                        mode,
                                    });
                                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                                        roomId,
                                        code: codeToChange,
                                    });
                                }} 
                                multi={false}
                                values={selectedLanguage}
                                className='selectDropdown'
                                closeOnSelect={true}
                                closeOnScroll={true}
                            />
                            <Select 
                                options={themes} 
                                onChange={(values) => {
                                    console.log(values);
                                    const theme = values[0].value
                                    setOptions({...options, theme});
                                }} 
                                multi={false}
                                values={[themes.find(theme => theme.value === 'tomorrow-night-bright')]}
                                className='selectDropdown'
                                closeOnSelect={true}
                                closeOnScroll={true}
                            /> 
                        </div>
                        <div className="editorBarButtonsDiv">
                            <button 
                                className="btn loginBtn submitBtn"
                                onClick={onSubmitButtonClick}
                                disabled={codeSubmissionState}
                            >
                            {codeSubmissionState? 'Judging': 'Submit'}</button>
                        </div>
                    </div>
                    <div style={{'marginBottom':'50px'}}>
                        {/* <Editor 
                            socketRef={socketRef}
                            roomId={roomId}
                            onCodeChange={onCodeChange}
                        /> */}
                        <CodeMirrorReact 
                            value={code} 
                            onBeforeChange={(editor, data, value) => {
                                const { origin } = data;
                                onCodeChange(value);
                                if(options.mode === CPP.value) {
                                    setCppCodeState(value);
                                } else if(options.mode === JAVA.value) {
                                    setJavaCodeState(value);
                                } else {
                                    setPythonCodeState(value);
                                }
                                if (origin !== 'setValue') {
                                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                                        roomId,
                                        code: value,
                                    });
                                }
                            }}
                            onChange={(editor, data, value) => { }}
                            options={options || defaultOptions} 
                            autoScroll={true}
                            autoCursor={true}
                            className='editor'
                        />
                    </div>
                </div>
                <SplitPane
                    split="vertical" 
                    minSize={200} 
                    defaultSize={300}
                    maxSize={500}
                    className="mainWrap"
                >
                    <div className="inputTextAreaWrapper">
                        <div style={{'height': '32px', 'backgroundColor': '#1c1e29', 'color': 'white', 'fontWeight':'bolder', padding:'4px'}}>Input</div>
                        <textarea 
                            value={input} 
                            onChange={(e) => {
                                onInputChange(e.target.value);
                                socketRef.current.emit(ACTIONS.INPUT_CHANGE, {
                                    roomId,
                                    input: e.target.value,
                                });
                            }}
                            className='inputTextArea'
                            placeholder="Place your Input here"
                        ></textarea>
                    </div>
                    <div className="inputTextAreaWrapper">
                        <div style={{'height': '32px', 'backgroundColor': '#1c1e29', 'color': 'white', 'fontWeight':'bolder', padding:'4px'}}>Output</div>
                        <textarea 
                            className="inputTextArea"
                            disabled
                            value={output}
                        ></textarea>
                    </div>
                </SplitPane>
            </SplitPane>
        </div>
    )
};

export default RealTimeEditor;