"use client";

import React, { useEffect, useRef, useState } from "react";
import { ResultBox } from "./ResultBox";
import { styled, css, keyframes } from "styled-components";

function ElsaRescuesAnnaGame() {
  //ref to get 'elsa' html element in js
  const elsaRef = useRef();
  //ref to get 'snowball' html element in js
  const snowballRef = useRef();
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  //method to add 'jump' class every '300ms' as the class jump css has jumping animation of 0.3s(300ms).
  //so on each key press we need to add animation and remove animation
  const jump = () => {
    if (!!elsaRef.current && elsaRef.current.classList !== "jump") {
      elsaRef.current.classList.add("jump");
      setTimeout(function () {
        elsaRef.current.classList.remove("jump");
      }, 600);
    }
  };

  const handleSnowballReset = () => {
    // document.documentElement.style.setProperty(
    //   "--snowball-starting-point",
    //   "580px"
    // );
    // document.documentElement.style.setProperty(
    //   "--snowball-animation",
    //   "block 2s infinite linear"
    // );
    setScore(0);
    setIsGameFinished(false);
  };

  //useEffect to track whether position of elsa and snowball is intersecting
  //if yes, then game over.
  useEffect(() => {
    const isAlive = setInterval(function () {
      //
      if (isGameFinished) {
        return;
      }
      // get current elsa Y position
      const elsaTop = parseInt(
        getComputedStyle(elsaRef.current).getPropertyValue("top")
      );

      // get current snowball X position
      const snowballLeft = parseInt(
        getComputedStyle(snowballRef.current).getPropertyValue("left")
      );

      // check if won
      if (score >= 1000) {
        // alert("Du hast gewonnen!");
        setIsGameFinished(true);
        document.documentElement.style.setProperty(
          "--snowball-animation",
          "none"
        );
        return;
        // detect collision
      } else if (snowballLeft < 50 && snowballLeft > 20 && elsaTop >= 290) {
        // collision
        document.documentElement.style.setProperty(
          "--snowball-animation",
          "none"
        );
        setIsGameFinished(true);
        document.documentElement.style.setProperty(
          "left",
          "var(--snowball-starting-point)"
        );
        return;
      } else {
        setScore(score + 10);
      }
    }, 100);

    return () => clearInterval(isAlive);
  });

  //hook to check for mobile device and call jump method on any touch or keypress
  useEffect(() => {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) {
      document.addEventListener("touchstart", jump);
      return () => document.removeEventListener("touchstart", jump);
    } else {
      document.addEventListener("keydown", jump);
      return () => document.removeEventListener("keydown", jump);
    }
  }, []);

  return (
    <StyledGame>
      <span>{score}</span>
      {isGameFinished ? (
        <ResultBox
          score={score}
          toggleSnowballReset={handleSnowballReset}
          isGameFinished={isGameFinished}
        />
      ) : (
        ""
      )}

      <StyledElsa ref={elsaRef} />
      <StyledSnowball
        id="snowball"
        ref={snowballRef}
        $isGameFinished={isGameFinished}
      />
    </StyledGame>
  );
}

export default ElsaRescuesAnnaGame;

const StyledGame = styled.main`
  width: 844px;
  height: 390px;
  border: 1px solid black;
  background-image: url(img/castle.png);
  background-size: cover;
  background-position-y: center;
  margin: auto;
`;

const StyledElsa = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(img/elsa.png);
  background-size: 50px 50px;
  transform: scaleX(-1);
  position: relative;
  top: 310px;
  left: 20px;
`;

//defining keyframes for rolling snowball
const snowballRolling = keyframes`
0% {
  left: var(--snowball-starting-point);
}

100% {
  left: -15px;
  transform: rotate(-360deg);
}
`;

// putting the snowball animation together
const snowballAnimation = () => css`${snowballRolling} 2s infinite}`;

// to do: "animation" abhängig von "isGameFinished"
// Problem: template literal erkennt "snowballAnimation" als Konstante in ternary operator nicht an
const StyledSnowball = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  top: 270px;
  left: var(--snowball-starting-point);
  background-image: url("img/snowball.png");
  background-size: 40px 40px;
  animation: ${(props) => (props.$isGameFinished ? "" : snowballAnimation)};
`;
