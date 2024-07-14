import "./App.css";
import React, { useState } from "react";

const DelayedAction = () => {
  const [actionStatus, setActionStatus] = useState("Text will Appear here");
  const [delayDuration, setDelayDuration] = useState(500);
  const [text, setText] = useState("");

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

  const Wpm = Math.round(60000 / delayDuration);

  return (
      <div className="Container">
        <div className="Container__left">
          <h1>
            RSVP <br />
            Reading
          </h1>
          <h2>Rapid Serial Visual Presentation</h2>
          <p>
            RSVP (Rapid Serial Visual Presentation) reading is a speed-reading
            technique where text is shown one word or small chunk at a time in a
            fixed position on a screen. This method minimizes eye movements,
            allowing readers to focus solely on processing words, thus
            potentially increasing reading speed. By keeping the text centrally
            located and controlling the pace, RSVP can help improve focus and
            concentration.
          </p>
        <h3>Sample of RSVP</h3> 

        </div>
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
            {/*This uploader does nothing currently */}
          </div>
          <select value={Wpm} onChange={handleWpmChange} className="Wpm-select"> 
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
          <input
            className="Wpm-slider"
            type="range"
            min="100"
            max="1000"
            value={delayDuration}
            onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))}
          />
          <p className="Wpm-display">Words Per minute: {Wpm}</p>
          <button onClick={handleButtonClick}>Start Reading</button>
          <h1>{actionStatus}</h1>{" "}
          {/* Button opens modal that displays Text screen, implement a play and pause button, rest button too*/}
        </section>
      </div>
  );
};

export default DelayedAction;
