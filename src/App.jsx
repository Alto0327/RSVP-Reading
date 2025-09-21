import "./App.css";
import React, { useContext, useState, useRef } from "react";
import Modal from "react-modal";
import { DarkModeContext } from "./components/ThemeContext";
import LogoDark from "./assets/Logo-Dark.png";
import LogoWhite from "./assets/Logo-White.png";
import pdfToText from "react-pdftotext";

const DelayedAction = () => {
  const [actionStatus, setActionStatus] = useState("Text will Appear here");
  const [delayDuration, setDelayDuration] = useState(500);
  const [text, setText] = useState("");
  const [fileText, setFileText] = useState(null);
  const [sampleStatus, setSampleStatus] = useState("Sample RSVP at 140 wpm");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const timeoutIds = useRef([]); // Ref to store timeout IDs

  const openModal = () => {
    setIsOpen(true);
    readText();
  };

  const closeModal = () => {
    setIsOpen(false);
    // Clear all timeouts when the modal is closed
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = []; // Reset the array
  };

  const themeSet = (e) => {
    e.preventDefault();
    toggleDarkMode();
    setIsChecked(!isChecked);
  };

  const readText = () => {
    let words = text.split(" ");

    if (fileText) {
      words = fileText.split(" ");
    }

    words.push(" ");

    words.forEach((word, index) => {
      const timeoutId = setTimeout(() => {
        setActionStatus(word);
      }, delayDuration * (index + 1));

      // Store timeout ID in ref
      timeoutIds.current.push(timeoutId);
    });
  };

  const handleWpmChange = (e) => {
    const newWPM = parseInt(e.target.value, 10);
    if (!isNaN(newWPM) && newWPM > 0) {
      setDelayDuration(Math.round(60000 / newWPM));
    }
  };

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

  const extractText = (event) => {
    const file = event.target.files[0];

    pdfToText(file)
      .then((pdfText) => {
        setFileText(pdfText);
      })
      .catch((error) => {
        console.error("Failed to extract text from pdf", error);
      });
  };

  const handleFileChange = (event) => {
    extractText(event);
  };

  const Wpm = Math.round(60000 / delayDuration);
  const sampleStart = "You are Reading this at 140 words per minutes! ";
  const sample =
    "RSVP (Rapid Serial Visual Presentation) is a speed-reading method where text is shown one word at a time in the same spot on the screen. This reduces eye movement and helps readers stay focused. RSVP can make reading easier not just for speed-reading practice, but also for people with dyslexia, ADHD, or visual tracking difficulties, since it keeps words steady and reduces distractions.";

  return (
    <div
      className={
        darkMode ? "Container Container-dark" : "Container Container-light"
      }
    >
      <header className="Header">
        <nav>
          <div className="Logo-div">
            <div className="item">
              <a href="#" className="link">
                <span>
                  <img
                    className="Logo Logo-darkMode"
                    src={LogoWhite}
                    alt="Dark Mode Logo"
                  />
                  <img
                    className="Logo Logo-default"
                    src={LogoDark}
                    alt="Default Logo"
                  />
                </span>
              </a>
            </div>
          </div>
        </nav>
        <div className="toggle-switch" onClick={themeSet}>
          <label className="switch-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={isChecked}
              onChange={themeSet}
            />
            <span className="slider"></span>
          </label>
        </div>
      </header>
      <main className="Main">
        <section className="Main__left">
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
        <section className="Main__right">
          <h2>Insert Text Here:</h2>
          <div className="Wpm-textUpload">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={10}
              cols={60}
              placeholder="Type or upload file to RSVP read"
              className="Textarea"
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="file-upload"
            />
          </div>
          <h3 className="Set_WPM">Set WPM</h3>
          <section className="Wpm__selectors">
            <div>
              <label className="wpm-selectors-text">Select from Preset:</label>
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

            <div className="Manual-input-div">
              <p>Enter custom WPM:</p>
              <input
                type="number"
                min="50"
                max="2000"
                placeholder="e.g. 300"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const num = parseInt(e.target.value, 10);
                    if (!isNaN(num) && num > 0) {
                      setDelayDuration(Math.round(60000 / num));
                    }
                  }
                }}
                className={darkMode ? "Wpm-input Wpm-input-dark" : "Wpm-input"}
              />
              <p className="Wpm-display">Current Speed: {Wpm} WPM</p>
            </div>
          </section>
          <div className="RSVP--button--Container">
            <button className="RSVP--button" onClick={openModal}>
              Start Reading
            </button>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            contentLabel="RSVP Reader"
            ariaHideApp={false}
          >
            <h1>{actionStatus}</h1>
          </Modal>
        </section>
      </main>
      <footer className={darkMode ? "footer footer-dark" : "footer"}>
        <div>
          <p>Aldo Fonseca 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default DelayedAction;
