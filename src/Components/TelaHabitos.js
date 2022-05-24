import styled from 'styled-components';
import Menu from './Menu';
import Topo from "./Topo";

export default function TelaHabitos () {
    return (
        <>
            <Topo />
            <Conteiner>
                <h1>Tela habitos</h1>
            </Conteiner>
            <Menu />
        </>

    );
}

const Conteiner = styled.div`
    margin-top: 70px;
    height: 100vh;
    background-color: #E5E5E5;
    max-width: 500px;
    min-width: 375px;
    h1 {
        font-size: 25px;
    }
`;