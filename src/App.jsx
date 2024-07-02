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
    const newWPM = parseInt(e.target.value, 10)
    if (!isNaN(newWPM) && newWPM > 0){
      setDelayDuration(Math.round(60000 / newWPM));
    }
  }

  const Wpm = Math.round(60000 / delayDuration);

  return (
    <div>
      <h1>What is RSVP reading?</h1>
      <p>
        Rapid serial visual presentation (RSVP) is a method for bypassing eye
        movements during reading. In RSVP, each word (or small group of words)
        appears in the same location, serially.
      </p>
      <h1>{actionStatus}</h1>
      <button onClick={handleButtonClick}>Start Reading</button>
      <input //set indentation on Slider to sorta lock onto set WPM speeds
        type="range"
        min="100"
        max="1000"
        value={delayDuration}
        onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))}
      />
      <select value={Wpm} onChange={handleWpmChange}>
        <option value={80}>80 WPM</option>
        <option value={120}>120 WPM</option>
        <option value={160}>160 WPM</option>
        <option value={200}>200 WPM</option>
        <option value={240}>240 WPM</option>
        <option value={280}>280 WPM</option>
        <option value={320}>320 WPM</option>
      </select>
      <p>Words Per minute: {Wpm}</p>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={4}
        cols={40}
      />
    </div>
  );
};


export default DelayedAction;
