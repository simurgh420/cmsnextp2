import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  children: ReactNode;
};
const MainButton = ({ children }: ButtonProps) => {
  return (
    <StyledWrapper>
      <div className="galaxy-button">
        <button className="space-button">
          <span className="backdrop" />
          <span className="galaxy" />
          <label className="text">{children}</label>
        </button>
        <div className="bodydrop" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .text {
    translate: 2% -6%;
    letter-spacing: 0.01ch;
    color: hsl(0 0% calc(60% + (var(--active) * 26%)));
    z-index: 999;
    padding: 0 34px;
    font-weight: 600;
  }
  .text::before {
    content: '';
    position: absolute;
    top: -290%;
    left: 90%;
    rotate: -45deg;
    width: 5em;
    height: 1px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: 4s shootingStar ease-in-out infinite;
    transition: 1s ease;
    z-index: -1;
    animation-delay: 1s;
    display: none;
  }
  .text::after {
    content: '';
    display: none;
    position: absolute;
    top: -290%;
    left: 10%;
    rotate: -45deg;
    width: 5em;
    height: 1px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: 7s shootingStar ease-in-out infinite;
    animation-delay: 3s;
  }
  .space-button:hover .text::before,
  .space-button:hover .text::after {
    display: block;
  }
  .galaxy::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    opacity: 1;
    box-shadow:
      140px 20px #fff,
      425px 20px #fff,
      70px 120px #fff,
      20px 130px #fff,
      110px 80px #fff,
      280px 80px #fff,
      250px 350px #fff,
      280px 230px #fff,
      220px 190px #fff,
      450px 100px #fff,
      380px 80px #fff,
      520px 50px #fff;
    z-index: -1;
    transition: all 1.5s ease-in-out;
    animation: 1s glowing-stars linear alternate infinite;
    animation-delay: 0.4s;
  }
  .galaxy::after {
    content: '';
    position: absolute;
    top: -150px;
    left: -65px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    opacity: 1;
    box-shadow:
      490px 330px #fff,
      420px 300px #fff,
      320px 280px #fff,
      380px 350px #fff,
      546px 170px #fff,
      420px 180px #fff,
      370px 150px #fff,
      200px 250px #fff,
      80px 20px #fff,
      190px 50px #fff,
      270px 20px #fff,
      120px 230px #fff,
      350px -1px #fff,
      150px 369px #fff;
    z-index: -1;
    transition: all 2s ease-in-out;
    animation: 1s glowing-stars linear alternate infinite;
    animation-delay: 0.8s;
  }
  .space-button {
    --cut: 0.1em;
    --active: 0;
    --bg:
      radial-gradient(
          120% 120% at 126% 126%,
          hsl(0 calc(var(--active) * 97%) 98% / calc(var(--active) * 0.9)) 40%,
          /* Changed hue to 0 for red */ transparent 50%
        )
        calc(100px - (var(--active) * 100px)) 0 / 100% 100% no-repeat,
      radial-gradient(
          120% 120% at 120% 120%,
          hsl(0 calc(var(--active) * 97%) 70% / calc(var(--active) * 1)) 30%,
          /* Changed hue to 0 for red */ transparent 70%
        )
        calc(100px - (var(--active) * 100px)) 0 / 100% 100% no-repeat,
      hsl(0 calc(var(--active) * 100%) calc(12% - (var(--active) * 8%))); /* Changed hue to 0 for red */
    background: var(--bg);
    font-size: 1.4rem;
    font-weight: 500;
    border: 0;
    cursor: pointer;
    padding: 0.9em 1.3em;
    display: flex;
    align-items: center;
    gap: 0.25em;
    white-space: nowrap;
    border-radius: 2rem;
    position: relative;
    box-shadow:
      0 0 calc(var(--active) * 6em) calc(var(--active) * 3em)
        hsla(12, 97%, 61%, 0.3),
      0 0.05em 0 0
        hsl(0, calc(var(--active) * 97%), calc((var(--active) * 50%) + 30%))
        inset,
      0 -0.05em 0 0 hsl(0, calc(var(--active) * 97%), calc(var(--active) * 10%))
        inset;

    transition:
      box-shadow 0.25s ease-out,
      scale 0.25s,
      background 0.25s;
    scale: calc(1 + (var(--active) * 0.1));
    transform-style: preserve-3d;
    perspective: 100vmin;
    overflow: hidden;
  }
  .space-button:active {
    scale: 1;
    --bg:
      radial-gradient(
          120% 120% at 126% 126%,
          hsl(245 calc(var(--active) * 97%) 98% / calc(var(--active) * 0.9)) 40%,
          transparent 50%
        )
        calc(100px - (var(--active) * 100px)) 0 / 100% 100% no-repeat,
      radial-gradient(
          120% 120% at 120% 120%,
          hsl(245 calc(var(--active) * 97%) 70% / calc(var(--active) * 1)) 30%,
          transparent 70%
        )
        calc(100px - (var(--active) * 100px)) 0 / 100% 100% no-repeat,
      hsl(245 calc(var(--active) * 100%) calc(12% - (var(--active) * 8%)));
    box-shadow:
      0 0 calc(var(--active) * 6em) calc(var(--active) * 3em)
        hsl(245 97% 61% / 0.5),
      0 0.05em 0 0
        hsl(245 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%))
        inset,
      0 -0.05em 0 0 hsl(245 calc(var(--active) * 97%) calc(var(--active) * 10%))
        inset;
    background: var(--bg);
  }

  /* Apply wobble animation on active button */
  .space-button:active .text {
    font-weight: 300;
    animation:
      wobble 0.6s ease-in-out infinite,
      blurMove 1.5s ease-in-out infinite;
    text-shadow:
      5px 5px 20px rgba(255, 255, 255, 0.8),
      10px 10px 30px rgba(255, 0, 255, 0.6);
  }

  /* Wobble animation */
  @keyframes wobble {
    0%,
    100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(-2px, -10px);
    }
    50% {
      transform: translate(2px, 3px);
    }
    75% {
      transform: translate(-1px, 5px);
    }
  }

  /* Blur move animation */
  @keyframes blurMove {
    0%,
    100% {
      text-shadow:
        5px 5px 20px rgba(255, 255, 255, 0.8),
        10px 10px 30px rgba(255, 0, 255, 0.6);
    }
    50% {
      filter: blur(1px);
      text-shadow:
        10px 10px 25px rgba(255, 255, 255, 0.8),
        15px 15px 35px rgba(255, 0, 255, 0.6);
    }
  }

  .galaxy:active::before {
    animation: circling 2s linear infinite; /* Animation for circling effect */
  }
  .galaxy:active::after {
    animation: circling 1.5s linear infinite; /* Animation for circling effect */
  }

  @keyframes circling {
    0% {
      transform: translate(-10px, -20%) rotate(0deg);
    }
    100% {
      transform: translate(-10px, -20%) rotate(200deg);
    }
  }
  .galaxy {
    position: absolute;
    width: 100%;
    aspect-ratio: 1;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    overflow: hidden;
    opacity: var(--active);
    transition: opacity 0.25s;
  }

  @-webkit-keyframes move-x {
    0% {
      translate: -100px 0;
    }
    100% {
      translate: 100px 0;
    }
  }
  @keyframes move-x {
    0% {
      translate: -100px 0;
    }
    100% {
      translate: 100px 0;
    }
  }
  @-webkit-keyframes move-y {
    0% {
      transform: translate(0, -50px);
    }
    100% {
      transform: translate(0, 50px);
    }
  }
  @keyframes move-y {
    0% {
      transform: translate(0, -50px);
    }
    100% {
      transform: translate(0, 50px);
    }
  }

  .backdrop {
    position: absolute;
    inset: var(--cut);
    background: var(--bg);
    border-radius: 2rem;
    transition: background 0.25s;
  }

  @supports (selector(:has(:is(+ *)))) {
    body:has(button:is(:hover, :focus-visible)) {
      --active: 1;
      --play-state: running;
    }
    .bodydrop {
      display: none;
    }
  }

  .space-button:is(:hover, :focus-visible) ~ :is(.bodydrop, .particle-pen) {
    --active: 1;
    --play-state: running;
  }

  .space-button:is(:hover, :focus-visible) {
    --active: 1;
    --play-state: running;
  }

  .galaxy-button {
    position: relative;
  }

  /* ANIMATIONS */
  @keyframes shootingStar {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateX(-55em) translateY(0);
      opacity: 1;
    }
    70% {
      transform: translateX(-70em) translateY(0);
      opacity: 0;
    }
    100% {
      transform: translateX(0) translateY(0);
      opacity: 0;
    }
  }

  @keyframes glowing-stars {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

export default MainButton;
