import React, { useEffect } from "react";
import "./App.css";
import "./Css/document.scss";
import { CssBaseline } from "@material-ui/core";
import HeaderToolbar from "./Toolbar";

const App: React.FC = () => {
  useEffect(() => {
    // document.addEventListener("mouseup", () => {
    //   let selection = window.getSelection(),
    //     value = selection.toString();
    //   if (value.length > 0) console.log("select", selection);
    // });
  }, []);
  return (
    <>
      <CssBaseline />
      <HeaderToolbar />
      <div className='paper-container'>
        <div className='A4'>
          <div className='sheet' contentEditable></div>
        </div>
        <div className='A4'>
          <div className='sheet' contentEditable></div>
        </div>
        <div className='A4'>
          <div className='sheet' contentEditable></div>
        </div>
        <div className='A4'>
          <div className='sheet' contentEditable></div>
        </div>
      </div>
    </>
  );
};

export default App;
