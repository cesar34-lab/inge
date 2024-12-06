import React, { useState } from 'react';
import Subir from './subir';
import Eliminar from './eliminar';
import Agregar from './agregar';
import styled from 'styled-components';
import Home from './home';
import { useNavigate } from "react-router-dom";
import SelectBor from './selectBor';


const Modificar = () => {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', selected: false },
    { id: 2, name: 'Item 2', selected: false },
    { id: 3, name: 'Item 3', selected: false },
  ]);

  const navigate = useNavigate();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Toggle the selection of an item
  const toggleSelectItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Delete selected items
  const deleteSelectedItems = () => {
    setItems((prevItems) => prevItems.filter((item) => !item.selected));
  };

  return (
    <StyledWrapper>
      <div className="home-container">
        <Home onClick={() => navigate('/admin')} />
      </div>

      <label className="label">
        <div className="shortcut">⌘K</div>
        <input type="text" className="search_bar" placeholder="Search for something..." />
      </label>
      <div className="list-container">
        {items.map((item) => (
          <div key={item.id} className="item">
            <SelectBor
              checked={item.selected}
              onChange={() => toggleSelectItem(item.id)}
            />
            <span className="item-name">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="button-container">
        <Agregar onClick={openModal} />
        <Subir showModal={showModal} closeModal={closeModal} />
        <Eliminar onClick={deleteSelectedItems} />
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  background-image: url('/modi.webp');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Centra los elementos en la parte superior */
  align-items: center; /* Centra los elementos horizontalmente */
  height: 100vh;
  width: 100vw;
  gap: 20px; /* Espacio entre el label y los botones */
  padding-top: 5vh; /* Ajuste dinámico para que el label no quede pegado al borde superior */

  .input {
    width: 100%; /* Hace que el input ocupe el 100% del ancho del contenedor */
    max-width: 300px;
  }
      .home-container {
    position: absolute; /* Permite moverlo independientemente de otros elementos */
    top: 10px; /* Ajusta la separación desde la parte superior */
    left: 10px; /* Ajusta la separación desde la izquierda */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .label {
    position: relative;
    display: block;
    width: 80%; /* El ancho se ajusta dinámicamente */
    max-width: 350px;
    border-radius: 10px;
    border: 2px solid #7193ff;
    padding: 15px 8px;
    text-align: left;
    box-shadow: 40px 40px 80px #2a00a3, -40px -40px 80px #ff3dcd;
    transition: transform 0.3s ease;
  }

  .label:hover {
    transform: scale(1.05);
  }

  .shortcut {
    position: absolute;
    top: 50%;
    right: -3%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    color: #7193ff;
    background-color: #00165d;
    padding: 0.3em;
    border-radius: 6px;
  }

  .search_bar {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: #9899ea;
    width: 100%;
  }
    .list-container {
    width: 80%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .item-name {
    font-size: 16px;
    color: #333;
  }

  /* Contenedor para los botones */
  .button-container {
    display: flex;
    justify-content: center; /* Centra los botones horizontalmente */
    gap: 15px;
    width: 100%;
    margin-top: auto; /* Coloca los botones en la parte inferior */
    padding-bottom: 5vh; /* Asegura espacio entre los botones y el borde inferior */
  }
    /*styled for buttom*/
    /* From Uiverse.io by boryanakrasteva */ 
.btn {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: none;
  position: relative;
  border-radius: 10px;
  -webkit-box-shadow: 1px 1px 5px .2px #00000035;
  box-shadow: 1px 1px 5px .2px #00000035;
  -webkit-transition: .2s linear;
  transition: .2s linear;
  transition-delay: .2s;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: space-between;
}

.btn:hover {
  width: 150px;
  transition-delay: .2s;
}

.btn:hover > .paragraph {
  visibility: visible;
  opacity: 1;
  -webkit-transition-delay: .4s;
  transition-delay: .4s;
}

.btn:hover > .icon-wrapper .icon {
  transform: scale(1.1);
}

.bnt:hover > .icon-wrapper .icon path {
  stroke: black;
}

.paragraph {
  color: black;
  visibility: hidden;
  opacity: 0;
  font-size: 18px;
  margin-right: 20px;
  padding-left: 20px;
  -webkit-transition: .2s linear;
  transition: .2s linear;
  font-weight: bold;
  text-transform: uppercase;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  transform: scale(.9);
  transition: .2s linear;
}

.icon path {
  stroke: #000;
  stroke-width: 2px;
  -webkit-transition: .2s linear;
  transition: .2s linear;
}
   
`;

export default Modificar;
