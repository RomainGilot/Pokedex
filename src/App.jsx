import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import SearchBar from "./components/SearchBar/SearchBar";
import Pokemon from "./components/Pokemon/Pokemon";
import pokedex from "./assets/images/pokedex.png";
import Light from "./components/Light/Light";
import clickSound from "./assets/sounds/click.mp3";
import SmallButton from "./components/Button/SmallButton";
import SmallButtonBlue from "./components/Button/SmallButtonBlue";

import { FaVolumeMute, FaVolumeUp, FaInfo } from "react-icons/fa";

const App = () => {
  const [pokemonNumber, setPokemonNumber] = useState(1);
  const [search, setSearch] = useState(1);
  const [mainOpen, setMainOpen] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [soundOn, setSoundOn] = useState(getSoundState());

  const playClickSound = () => {
    if (soundOn) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  const handlePrevClick = () => {
    if (pokemonNumber > 1) {
      setPokemonNumber(+pokemonNumber - 1);
      playClickSound();
    }
  };

  const handleNextClick = () => {
    setPokemonNumber(+pokemonNumber + 1);
    playClickSound();
  };

  useEffect(() => {
    if (search !== "") {
      setPokemonNumber(search);
    }
  }, [search]);

  const toggleMainVisibility = () => {
    setIsSliding(true);
    setIsZoomed(false);
  };

  const handleZoomClick = () => {
    setIsZoomed(true);
  };

  const handleUnzoomClick = () => {
    setIsZoomed(false);
  };

  const handleOpenMain = () => {
    setIsSliding(false);
  };

  const toggleSound = () => {
    const newSoundState = !soundOn;
    setSoundOn(newSoundState);
    setSoundState(newSoundState);
  };

  return (
    <div className="App">
      {mainOpen && (
        <main className={`${isSliding ? "slide-down" : ""} ${isZoomed ? "zoomed" : ""}`}>
          <Pokemon pokemonNumber={pokemonNumber} />
          <form>
            <SearchBar setSearch={setSearch} value={pokemonNumber} />
          </form>

          <div className="buttons">
            <Button name="Précédent" onClick={handlePrevClick} />
            <Button name="Suivant" onClick={handleNextClick} />
          </div>

          <div style={{ position: "absolute", left: "58%", top: "25%" }}>
            <SmallButton name={soundOn ? <FaVolumeUp /> : <FaVolumeMute />} onClick={toggleSound} />
          </div>

          <div className="close-button" onClick={toggleMainVisibility}></div>
          <div className="zoom-button" onClick={isZoomed ? handleUnzoomClick : handleZoomClick}></div>
          <div className="open-button" onClick={handleOpenMain}></div>

          <div>
            <Light />
          </div>

          <img src={pokedex} alt="pokedex" className="pokedex" />
        </main>
      )}
    </div>
  );
};

const setSoundState = (state) => {
  localStorage.setItem("sound", state ? "on" : "off");
};

const getSoundState = () => {
  return localStorage.getItem("sound") === "on";
};

export default App;
