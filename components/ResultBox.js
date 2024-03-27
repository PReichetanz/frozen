import styled from "styled-components";
import { useEffect, useState } from "react";

export const ResultBox = ({ score, toggleSnowballReset, isGameFinished }) => {
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    if (isGameFinished && score >= 1000) {
      setIsGameWon(true);
    }
  }, [isGameFinished, score]);

  const handleClick = () => {
    toggleSnowballReset();
    setIsGameWon(false);
  };

  return (
    <Section $isGameFinished={isGameFinished}>
      <h2>
        {isGameWon ? "Du hast gewonnen! 🥳" : "Du hast leider verloren 😫"}
      </h2>
      <p>Dein Punktestand: {score}</p>
      <button type="button" onClick={handleClick}>
        Neu starten!
      </button>
    </Section>
  );
};

const Section = styled.section`
  position: absolute;
  top: 20%;
  left: 35%;
  background-color: #5fb6c7;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #113154;
`;
