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

  let WPM = Math.round(60000 / delayDuration);

  return (
    <div>
      <div className="container">
        <section className="leftSide-Main">
          <h1>RSVP</h1>
          <h2>Rapid Serial Visual Presentation</h2>
          <p>
            Rapid serial visual presentation (RSVP) is a method for bypassing
            eye movements during reading. In RSVP, each word (or small group of
            words) appears in the same location, serially.
          </p>
          <iframe
            src="https://www.youtube.com/embed/5yddeRrd0hA&ab"
            frameborder="0"
          ></iframe>
          {/* YOUTUBE VIDEO DOES NOT WORK LOOK INTO */}
        </section>
        <section className="rightSide-Main">
          <input //set indentation on Slider to sorta lock onto set WPM speeds
            type="range"
            min="100"
            max="1000"
            value={delayDuration}
            onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))}
          />
          <input
            type="text"
            value={WPM}
            onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))}
            //Above code causes error here so need to create a new function to hanlde WPM change
            //1.Calculate delay duration from WPM when the user inputs WPM.
            //Update the delay duration accordingly.
          />
          <p>Words Per minute: {WPM}</p>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={4}
            cols={40}
          />
          <button onClick={handleButtonClick}>Start Reading</button>
          <h1>{actionStatus}</h1>
        </section>
      </div>
    </div>
  );
};

export default DelayedAction;
