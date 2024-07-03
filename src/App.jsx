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
    <div>
      <div className="container">
        <section className="leftSide-Main">
          <h1>RSVP <br/>Reading</h1>
          <h2>Rapid Serial Visual Presentation</h2>
          <p>
            Rapid serial visual presentation (RSVP) is a method for bypassing
            eye movements during reading. In RSVP, each word (or small group of
            words) appears in the same location, serially.
          </p>
          {/* Error with Youtube Video causing it to be unable to Play */}
          <iframe
            src="https://www.youtube.com/embed/5yddeRrd0hA&ab"
            frameborder="0"
          ></iframe>
        </section>
        <section className="rightSide-Main">

          <select value={Wpm} onChange={handleWpmChange}>
            <option value="" default   >WPM options</option>
            <option value={80}>80 WPM</option>
            <option value={120}>120 WPM</option>
            <option value={160}>160 WPM</option>
            <option value={200}>200 WPM</option>
            <option value={240}>240 WPM</option>
            <option value={280}>280 WPM</option>
            <option value={326}>326 WPM</option>
          </select>
          <input className="Wpm-slider"
            type="range"
            min="100"
            max="1000"
            value={delayDuration}
            onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))}
            />
          <p>Words Per minute: {Wpm}</p>
          
          {/* To Add n fix
            1. Make Text Area Larger
            2. Add word n pdf File only uploader
            3. Add a Remaining word char on bottom right of Text Area
            */}
          <div className="textUpload">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={10}
              cols={60}
              placeholder="paste or upload file to RSVP read"
            />
            <input type="file" accept=".doc, .docx, .pdf" />
          </div>
          <button onClick={handleButtonClick}>Start Reading</button>
          <h1>{actionStatus}</h1> {/* Button opens modal that displays Text screen, implement a play and pause button, rest button too*/}
        </section>
      </div>
    </div>
  );
};

export default DelayedAction;
