import React, { useState } from "react";
import { Editor } from 'primereact/editor';        
import "primereact/resources/themes/lara-light-teal/theme.css";
import './editor.scss'

export default function LASGEditor({value, readOnly, submittableText}) {

    const [text, setText] = useState(value);

    const renderedHtml = (e) => {

        setText(e);
        submittableText(e);

    } 

    return (

        <div className="card">

            <Editor value={text} onTextChange={(e) => renderedHtml(e.htmlValue)} style={{ height: '650px' }} readOnly = {readOnly} />

        </div>

    )
}
        