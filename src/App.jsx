import "./App.css";
import React, { useContext, useState } from "react";
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

  const openModal = () => {
    setIsOpen(true);
    readText();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const themeSet = () => {
    event.preventDefault();
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
    "RSVP (Rapid Serial Visual Presentation) reading is a speed-reading technique where text is shown one word or small chunk at a time in a fixed position on a screen. This method minimizes eye movement allowing readers to focus solely on processing words, thus potentially increasing reading speed. By keeping the text centrally located and controlling the pace, RSVP can help improve focus and concentration.";

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
              <div className={darkMode ? "submenu submenu-dark" : "submenu "}>
                <div className="submenu-item">
                  <a
                    href="https://github.com/Alto0327"
                    target="_blank"
                    className="submenu-link"
                  >
                    GitHub
                  </a>
                </div>
                <div className="submenu-item">
                  <a href="#" className="submenu-link">
                    Linkedin
                  </a>
                </div>
                <div className="submenu-item">
                  <a href="#" className="submenu-link">
                    My Portfolio
                  </a>
                </div>
              </div>
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

            <div className="Slider-div">
              <p>Manually set:</p>
              <input
                className={
                  darkMode ? "Wpm-slider Wpm-slider-dark" : "Wpm-slider"
                }
                type="range"
                min="100"
                max="1000"
                value={delayDuration}
                onChange={(e) => setDelayDuration(parseInt(e.target.value, 10))}
              />
              <p className="Wpm-display">Words Per minute: {Wpm}</p>
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
          <p>Aldo Fonseca 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default DelayedAction;
