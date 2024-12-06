import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();


    return (
        <StyledWrapper>
            <button onClick={() => navigate('/modificar')}> BUSCAR
            </button>
            <button onClick={() => navigate('/oyente')}> PAUTA
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
background-image: url('/admin.webp');
background-repeat:no-repeat;    
  background-size: cover; 
  background-position: center;
  display: flex;
  justify-content: center; /* Centra los botones horizontalmente */
  align-items: center; /* Centra los botones verticalmente */
  height: 100vh; /* Utiliza todo el alto de la ventana */
  gap: 15vw; /* Espacio entre los botones */
  width:100vw;

  button {
   padding: 15px 25px;
   border: unset;
   border-radius: 15px;
   color: #212121;
   z-index: 1;
   background: #e8e8e8;
   position: relative;
   font-weight: 1000;
   font-size: 17px;
   -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   transition: all 250ms;
   overflow: hidden;
  }

  button::before {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 0;
   border-radius: 15px;
   background-color: #212121;
   z-index: -1;
   -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   transition: all 250ms
  }

  button:hover {
   color: #e8e8e8;
  }

  button:hover::before {
   width: 100%;
  }`;

export default Admin;
