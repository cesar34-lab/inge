import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, children }) => {
  return (
    <StyledWrapper>
      <button className="glowbutton" onClick={onClick}>
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .glowbutton {
    --glow-color: rgb(176, 252, 255);
    --glow-spread-color: rgba(123, 251, 255, 0.781);
    --enhanced-glow-color: rgb(206, 255, 255);
    --btn-color: rgb(61, 127, 136);
    border: 0.25em solid var(--glow-color);
    padding: 1em 3em;
    color: var(--glow-color);
    font-size: 15px;
    font-weight: bold;
    background-color: var(--btn-color);
    border-radius: 1em;
    outline: none;
    .elemento {
    box-shadow: 0 0 2em 0.5em var(--glow-color),          /* Aumenta el desenfoque y la propagación */
                0 0 6em 1.5em var(--glow-spread-color),   /* Aumenta el desenfoque y la propagación */
                inset 0 0 1.5em 0.5em var(--glow-color); /* Aumenta el desenfoque y la propagación de la sombra interna */
    
    text-shadow: 0 0 1em var(--glow-color);              /* Aumenta el desenfoque del texto */
    
    position: relative;
    transition: all 0.3s;
}

  }

  .glowbutton::after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 120%;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--glow-spread-color);
    filter: blur(2em);
    opacity: 0.7;
    transform: perspective(1.5em) rotateX(35deg) scale(1, 0.6);
  }

  .glowbutton:hover {
    color: var(--btn-color);
    background-color: var(--glow-color);
    box-shadow: 0 0 1em 0.25em var(--glow-color),
      0 0 4em 2em var(--glow-spread-color),
      inset 0 0 0.75em 0.25em var(--glow-color);
  }

  .glowbutton:active {
    box-shadow: 0 0 0.6em 0.25em var(--glow-color),
      0 0 2.5em 2em var(--glow-spread-color),
      inset 0 0 0.5em 0.25em var(--glow-color);
  }`;

export default Button;
