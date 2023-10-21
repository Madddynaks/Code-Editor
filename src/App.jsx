import { useState } from 'react'
import { useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Editor from '@monaco-editor/react'

function App() {

  const editorRef = useRef();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    const savedValue = localStorage.getItem('editorValue');
    if(savedValue){
      editor.setValue(savedValue);
    }
  };

  const handleCopy = () => {
    const editorContent  = editorRef.current.getModel().getValue();
    navigator.clipboard.writeText(editorContent);
    alert("Your Code has been copied to clipboard");
  }

  const handleToggle = () => {
    const isReadOnly = editorRef.current.getOption(monaco.editor.EditorOption.readOnly);
    editorRef.current.updateOptions({readOnly: !isReadOnly});
  }

  const handleSave = () => {
    const editorcontent = editorRef.current.getModel().getValue();
    localStorage.setItem('editorValue',editorcontent);
    alert("Your code has been saved")
  }

  return (
    <div className='App'>
      <Editor
        height="100vh"
        width="70%"
        theme='vs-dark'
        defaultLanguage='cpp'
        defaultValue=' '
        // options={{readOnly: false}}
        onMount={handleEditorDidMount}
      />
      <div className='text'>
        This is a C++ Code Editor
        <div className='buttons'>
          <button onClick={handleCopy}>Copy</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleToggle}>Lock/Unlock</button>
        </div>
      </div>
    </div>
  )
}

export default App
