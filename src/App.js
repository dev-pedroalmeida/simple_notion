import "./App.css";
import React, { useState, useCallback, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { withLayout } from "./functions/CustomLayout";
import { Element, Leaf } from "./functions/BlockTypes";
import FormatToolbar from "./functions/FormatToolbar";

import linkedinIcon from './assets/linkedin-icon.png'
import githubIcon from './assets/github-icon.png'

function App() {
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem("simplenotion_content")) || [
        {
          type: "title",
          children: [{ text: "Sem título" }],
        },
        {
          type: "paragraph",
          children: [{ text: "Comece sua anotação!" }],
        },
      ],
    []
  );

  const [editor] = useState(() =>
    withLayout(withReact(withHistory(createEditor())))
  );

  // Slate render functions //

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <>
      <div className="md">
        <div className="md-nav">
          <div className="nav-title">Simple Notion</div>
          <div className="nav-links">
            <a className="nav-link" href="https://www.linkedin.com/in/pedroalmeida714/" target="_blank" rel="noreferrer"> 
              <img src={linkedinIcon} alt="LinkedIn Icon" />
            </a>
            <a className="nav-link" href="https://github.com/dev-pedroalmeida" target="_blank" rel="noreferrer"> 
              <img src={githubIcon} alt="Github Icon" />
            </a>
          </div>
        </div>
        <div className="md-editor">
          <Slate
            editor={editor}
            value={initialValue}
            onChange={(value) => {
              const isAtChange = editor.operations.some(
                (op) => "set_selection" !== op.type
              );
              if (isAtChange) {
                const content = JSON.stringify(value);
                localStorage.setItem("simplenotion_content", content);
              }
            }}
          >
            <FormatToolbar />
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Sem título"
              autoFocus
            />
          </Slate>
        </div>
      </div>
    </>
  );
}

export default App;
