import "./App.css";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


const DelayedAction = () => {
  const [actionStatus, setActionStatus] = useState("Text will Appear here");
  const [delayDuration, setDelayDuration] = useState(500);
  const [text, setText] = useState("");
  const [sampleStatus, setSampleStatus] = useState("Sample RSVP at 140 wpm");
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    const words = text.split(" ");

    words.forEach((word, index) => {
      setTimeout(() => {
        setActionStatus(word);
      }, delayDuration * (index + 1));
    });
  };

  const handleWpmChange = (e) => {
    const newWPM = parseInt(e.target.value, 10);
    if (!isNaN(newWPM) && newWPM > 0) {
      setDelayDuration(Math.round(60000 / newWPM));
    }
  };
  const sampleStart = "You are Reading this at 140 words per minutes! ";
  const sample =
    "RSVP (Rapid Serial Visual Presentation) reading is a speed-reading technique where text is shown one word or small chunk at a time in a fixed position on a screen. This method minimizes eye movement allowing readers to focus solely on processing words, thus potentially increasing reading speed. By keeping the text centrally located and controlling the pace, RSVP can help improve focus and concentration.";

  const handleSampleClick = () => {
    const sampleSet = sampleStart.concat(sample);
    const sampleDisplay = sampleSet.split(" ");
    sampleDisplay.push("Click to Replay");

    sampleDisplay.forEach((sampleDisplay, index) => {
      setTimeout(() => {
        setSampleStatus(sampleDisplay);
      }, 420 * (index + 1));
    });
  };
  const Wpm = Math.round(60000 / delayDuration);


  function openModal() {
    setIsOpen(true);
    handleButtonClick(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');
  return (
    <div className="Container">
      <section className="Container__left">
        <h1 className="Title">
          RSVP <br />
          Reading
        </h1>
        <div className="Description">
          <h2>Rapid Serial Visual Presentation</h2>
          <p>{sample}</p>
        </div>
        <div className="Sample-rsvp">
          <h2 onClick={handleSampleClick}>{sampleStatus}</h2>
        </div>
      </section>
      <section className="Container__right">
        <h2>Insert Text Here:</h2>
        <div className="Wpm-textUpload">
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={10}
            cols={60}
            placeholder="paste or upload file to RSVP read"
          />
          <input type="file" accept=".doc, .docx, .pdf" />{" "}
          {/*This uploader does nothing currently 
            Change button to be more sleek */}
        </div>
        <h3 className="">Set WPM</h3>
        <section className="Wpm__selectors">
          <div>
            <label>Select from Preset:</label>
            <select
              value={Wpm}
              onChange={handleWpmChange}
              className="Wpm-select"
            >
              <option value="" default>
                WPM options
              </option>
              <option value={80}>80 WPM</option>
              <option value={120}>120 WPM</option>
              <option value={160}>160 WPM</option>
              <option value={200}>200 WPM</option>
              <option value={240}>240 WPM</option>
              <option value={280}>280 WPM</option>
              <option value={326}>326 WPM</option>
            </select>
          </div>

          <div>
            <p>Manually set:</p>
            <input
              className="Wpm-slider"
              type="range"
              min="100"
              max="1000"
              value={delayDuration}
              onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))}
            />
            <p className="Wpm-display">Words Per minute: {Wpm}</p>
          </div>
        </section>
        {/* <Link to="/RSVP"> */}
        <div className="RSVP--button--Container">
          <button className="RSVP--button" onClick={handleButtonClick}>Start Reading</button>
        </div>
        {/* </Link> */}
          <h1>{actionStatus}</h1>
            <button onClick={openModal}>Test</button>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>I am a modal</div>
            <h1>{actionStatus}</h1>
      </Modal>
          
        {/* NEED TO SEND THIS  H1 as a prop to the Rsvp component to where we can read its content there */}
      </section>
    </div>
  );
};

export default DelayedAction;
