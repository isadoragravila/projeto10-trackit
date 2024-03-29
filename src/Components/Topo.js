import styled from 'styled-components';
import { useContext } from 'react';
import ImgContext from "../Contexts/ImgContext";

export default function Topo () {
    const { img } = useContext(ImgContext);

    return (
        <Conteiner>
            <h1>TrackIt</h1>
            <img src={img} alt="usuario" />
        </Conteiner>
    );
}

const Conteiner = styled.div`
    height: 70px;
    max-width: 500px;
    width: 100%;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    z-index: 1;

    h1 {
        font-family: 'Playball';
        font-weight: 400;
        font-size: 38.982px;
        color: #FFFFFF;
    }

    img {
        width: 51px;
        height: 51px;
        object-fit: cover;
        border-radius: 25.5px;
    }
`;