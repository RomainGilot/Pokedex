import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pokemon.css";
import Button from "../Button/Button";
import heart from "../../assets/images/heart.png";
import defense from "../../assets/images/defense.png";
import attack from "../../assets/images/attack.png";
import speed from "../../assets/images/speed.png";
import specialattack from "../../assets/images/specialattack.png";
import specialdefense from "../../assets/images/specialdefense.png";
import clickSound from "../../assets/sounds/click.mp3";
import SmallButtonBlue from "../Button/SmallButtonBlue";
import { FaInfo } from "react-icons/fa";

const Pokemon = ({ pokemonNumber }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [detailView, setDetailView] = useState("types");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonNumber}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error("Erreur dans la récup des données", error);
      }
    };

    fetchPokemonData();
  }, [pokemonNumber]);

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleDetailViewChange = (view) => {
    setDetailView(view);
    playClickSound();
  };

  if (!pokemonData) {
    return <div>ça charge</div>;
  }

  return (
    <>
      <img src={pokemonData.image} alt="pokemon" className="pokemon_image" />

      <div className="pokemon_type">
        {detailView === "types" && (
          <ul>
            {pokemonData.apiTypes.map((type) => (
              <li key={type.id} className="li_type">
                <img src={type.image} alt="type" className="type_image" />
                {type.name}
              </li>
            ))}
          </ul>
        )}

        {detailView === "stats" && (
          <div style={{ display: "flex" }}>
            <ul>
              <li className="li_type">
                <img src={heart} alt="Heart" className="type_image" />
                {pokemonData.stats.HP}
              </li>
              <li className="li_type">
                <img src={attack} alt="Attack" className="type_image" />
                {pokemonData.stats.attack}
              </li>
            </ul>
            <ul style={{ marginLeft: "20px" }}>
              <li className="li_type">
                <img src={defense} alt="Defense" className="type_image" />
                {pokemonData.stats.defense}
              </li>
              <li className="li_type">
                <img src={specialattack} alt="Defense" className="type_image" />
                {pokemonData.stats.special_attack}
              </li>
            </ul>
            <ul style={{ marginLeft: "20px" }}>
              <li className="li_type">
                <img src={specialdefense} alt="Defense" className="type_image" />
                {pokemonData.stats.special_defense}
              </li>
              <li className="li_type">
                <img src={speed} alt="Defense" className="type_image" />
                {pokemonData.stats.speed}
              </li>
            </ul>
          </div>
        )}

        {detailView === "infos" && (
          <ul>
            <li className="li_type">Développé par Romain GILOT</li>
            <a href=" https://pokedex.romain-gilot.fr" className="li_type">
              https://pokedex.romain-gilot.fr
            </a>
          </ul>
        )}
      </div>

      <div className="buttons_right">
        <Button name="Types" onClick={() => handleDetailViewChange("types")} />
        <Button name="Stats" onClick={() => handleDetailViewChange("stats")} />
      </div>
      <div style={{ position: "absolute", left: "58%", top: "65%" }}>
        <SmallButtonBlue name={<FaInfo />} onClick={() => handleDetailViewChange("infos")} />
      </div>

      <h1 className="pokemon_data">
        <span className="pokemon_number">{pokemonData.id}</span> - <span className="pokemon_name">{pokemonData.name}</span>
      </h1>
    </>
  );
};

export default Pokemon;
