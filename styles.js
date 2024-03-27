import { createGlobalStyle, keyframes } from "styled-components";

const jumpAnimation = keyframes`
0% {
  top: 310px;
}

30% {
  top: 290px;
}

50% {
  top: 240px;
}

80% {
  top: 290px;
}

100% {
  top: 310px;
}
`;

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    --snowball-starting-point: 880px;
    --snowball-animation: block 2s infinite linear;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }

  .jump {
    animation: ${jumpAnimation} 0.6s linear;
  }
`;
