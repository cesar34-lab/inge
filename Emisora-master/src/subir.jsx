import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85); /* Este es el overlay oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  .btn {
    background-color: transparent;
    position: relative;
    border: none;
  }

  .btn::after {
    content: 'delete';
    position: absolute;
    top: -130%;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
    height: fit-content;
    background-color: rgb(168, 7, 7);
    padding: 4px 8px;
    border-radius: 5px;
    transition: .2s linear;
    transition-delay: .2s;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
  }

  .icon {
    transform: scale(1.2);
    transition: .2s linear;
  }

  .btn:hover > .icon {
    transform: scale(1.5);
  }

  .btn:hover > .icon path {
    fill: rgb(168, 7, 7);
  }

  .btn:hover::after {
    visibility: visible;
    opacity: 1;
    top: -160%;
  }
  
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 4em;
    height: 4em;
    border: none;
    background: rgba(180, 83, 107, 0.11);
    border-radius: 50%;
    transition: background 0.5s;
    cursor: pointer;
  }

  .X {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 1.5px;
    background-color: rgb(255, 255, 255);
    transform: translateX(-50%) rotate(45deg);
  }

  .Y {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 1.5px;
    background-color: #fff;
    transform: translateX(-50%) rotate(-45deg);
  }

  .close {
    position: absolute;
    display: flex;
    padding: 0.8rem 1.5rem;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    top: -70%;
    left: 50%;
    width: 3em;
    height: 1.7em;
    font-size: 12px;
    background-color: rgb(19, 22, 24);
    color: rgb(187, 229, 236);
    border: none;
    border-radius: 3px;
    pointer-events: none;
    opacity: 0;
  }

  .button:hover {
    background-color: rgb(211, 21, 21);
  }

  .button:active {
    background-color: rgb(130, 0, 0);
  }

  .button:hover > .close {
    animation: close 0.2s forwards 0.25s;
  }

  @keyframes close {
    100% {
      opacity: 1;
    }
  }

  .custum-file-upload {
    height: 200px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #e8e8e8;
    background-color: #212121;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px #e8e8e8;
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 80px;
    fill: #e8e8e8;
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: #e8e8e8;
  }

  .custum-file-upload input {
    display: none;
  }
    /* From Uiverse.io by PriyanshuGupta28 */ 
.pushable {
  position: relative;
  background: transparent;
  padding: 0px;
  border: none;
  cursor: pointer;
  outline-offset: 4px;
  outline-color: deeppink;
  transition: filter 250ms;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: hsl(226, 25%, 69%);
  border-radius: 8px;
  filter: blur(2px);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.edge {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(
    to right,
    hsl(248, 39%, 39%) 0%,
    hsl(248, 39%, 49%) 8%,
    hsl(248, 39%, 39%) 92%,
    hsl(248, 39%, 29%) 100%
  );
}

.front {
  display: block;
  position: relative;
  border-radius: 8px;
  background: hsl(248, 53%, 58%);
  padding: 16px 32px;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 1rem;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.pushable:hover {
  filter: brightness(110%);
}

.pushable:hover .front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.pushable:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.pushable:hover .shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.pushable:active .shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.pushable:focus:not(:focus-visible) {
  outline: none;
}

`;

const ModalContent = styled.div`
  position: relative;
  box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.5), 
    0 5vw 10vw rgba(255, 0, 150, 0.7), 
    0 8vw 16vw rgba(0, 150, 255, 0.55),
    0 0 10px rgba(255, 0, 150, 0.7), 
    0 0 15px rgba(255, 0, 150, 0.7);
  top: 0;
  left: 0;
  width: 50vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(90, 100, 100, 0.9); /* Fondo del modal */
  border-radius: 5vw;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 
      0 2vw 4vw rgba(0, 0, 0, 0.5), 
      0 5vw 10vw rgba(255, 0, 150, 0.7), 
      0 8vw 16vw rgba(0, 150, 255, 0.55),
      0 0 20px rgba(255, 0, 150, 0.9), 
      0 0 25px rgba(255, 0, 150, 0.9);
  }
`;

const Subir = ({ showModal, closeModal }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Manejo de cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    } else {
      alert('Por favor selecciona un archivo de audio válido.');
    }
  };

  // Manejo de la eliminación del archivo
  const handleRemoveFile = () => {
    setAudioFile(null);
    setPreview(null);
  };

  // Manejo de la subida de archivo
  const handleUpload = () => {
    if (!audioFile) {
      alert('Primero selecciona un archivo de audio.');
      return;
    }
    const formData = new FormData();
    formData.append('audio', audioFile);

    fetch('https://tu-servidor-api.com/subir-audio', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Archivo subido exitosamente:', data);
        // Limpiar las previsualizaciones después de subir
        setAudioFile(null);
        setPreview(null);
      })
      .catch((error) => {
        console.error('Error al subir el archivo:', error);
      });
  };

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <StyledWrapper onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <button className="button" onClick={closeModal}>
            <span className="X" />
            <span className="Y" />
            <div className="close">Close</div>
          </button>
          <label htmlFor="file" className="custum-file-upload">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill />
              </svg>
            </div>
            <div className="text">
              <span>Click to upload audio</span>
            </div>
            <input id="file" type="file" accept="audio/*" onChange={handleFileChange} />
          </label>
          {preview && (
  <div className="preview-container" style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
    <audio controls src={preview} style={{ marginRight: '10px' }} />
    <button 
      className="btn" 
      onClick={handleRemoveFile} 
      style={{ marginTop: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg viewBox="0 0 15 17.5" height="17.5" width={15} xmlns="http://www.w3.org/2000/svg" className="icon">
        <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill" />
      </svg>
    </button>
  </div>
)}

          <button className='pushable' onClick={handleUpload} style={{ marginTop: '20px' }}>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">PUSH ME</span>
          </button>
        </div>
      </ModalContent>
    </StyledWrapper>,
    document.body
  );
};

export default Subir;
