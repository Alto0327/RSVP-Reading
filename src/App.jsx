import './App.css'

import React, { useState } from 'react';

const DelayedAction = () => {
  const [actionStatus, setActionStatus] = useState('Text will Appear here');
  const [delayDuration, setDelayDuration] = useState(500);
  const [text, setText] = useState('');

  const handleButtonClick = () => {

    const words = text.split(' ');
    
    words.forEach((word, index) => {
      setTimeout(() => {
        setActionStatus(word);
      }, delayDuration * (index + 1)); 
    });
  };

 let WPM = Math.round(60000/delayDuration)

  return (
    <div>
      <h1>What is RSVP reading?</h1>
      <p>Rapid serial visual presentation (RSVP) is a method for bypassing eye movements during reading. In RSVP, each word (or small group of words) appears in the same location, serially.</p>
      <h1>{actionStatus}</h1>
      <button onClick={handleButtonClick}>Start Reading</button>
      <input 
        type="range" min="100" max="1000"
        value={delayDuration} 
        onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))} 
      /> 
    {/* Make Range bar the wpm selector move the text input*/} 
      <input type="text"
        value={WPM}
        onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))} 
        //Above code causes error here so need to create a new function to hanlde WPM change 
        //1.Calculate delay duration from WPM when the user inputs WPM.
        //Update the delay duration accordingly.
      />
      <p>Words Per minute: {WPM}</p>
      <textarea 
        value={text} 
        onChange={event => setText(event.target.value)} 
        rows={4}
        cols={40}
      />
    </div>
  );
};

export default DelayedAction;
