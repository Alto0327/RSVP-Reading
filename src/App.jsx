// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// import React, { useState } from 'react';

// function App() {
//   const [text, setText] = useState('');

//   let X = text.split(" ");

//   console.log({X})

//   return (
//     <div className="App">
//       <textarea 
//         value={text} 
//         onChange={event => setText(event.target.value)} 
//       />
//       <p>{X}</p>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from 'react';

// const DelayedAction = () => {
//   const [actionStatus, setActionStatus] = useState('Idle');
//   const [delayDuration, setDelayDuration] = useState(3000);
//   const [text, setText] = useState('');

//   let X = 0
//   X=text.split(" ");

//   console.log({X})

//   const handleButtonClick = () => {
//     setActionStatus('Action in progress...');

//     // Use setTimeout to simulate a delayed action
//     for (let i = 0, len = X.length; i < len; i++){
//       setTimeout(() => {
//         // const y= X.forEach((X, index) => setActionStatus(`${index}:${X}`))
//         setActionStatus(X[i])
//       }, delayDuration);
//     }


//   };

//   return (
//     <div>
//       <p>Status: {actionStatus}</p>
//       <button onClick={handleButtonClick}>Trigger Delayed Action</button>
//       <input
//         type="number"
//         value={delayDuration}
//         onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))}
//       />
//       <textarea 
//         value={text} 
//         onChange={event => setText(event.target.value)} 
//      />
//      <p>{X}</p>
//     </div>
//   );
// };

// export default DelayedAction;


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
      }, delayDuration * (index + 1)); // incrementing delay for each word
    });
  };

  return (
    <div>
      <h1>What is RSVP reading?</h1>
      <p>Rapid serial visual presentation (RSVP) is a method for bypassing eye movements during reading. In RSVP, each word (or small group of words) appears in the same location, serially.</p>
      <h1>{actionStatus}</h1>
      <button onClick={handleButtonClick}>Start Reading</button>
      <input
        type="number"
        value={delayDuration}
        onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))}
      />
      <textarea 
        value={text} 
        onChange={event => setText(event.target.value)} 
        rows={4}
        cols={40}
      />
    </div>
  );
};

// im writing this into the master branch
export default DelayedAction;
