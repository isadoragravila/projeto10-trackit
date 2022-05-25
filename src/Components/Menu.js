import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function Menu () {
    return (
        <Conteiner>
            <Link to="/habitos">
                <p>Hábitos</p>
            </Link>
            <Link to="/hoje">
                <p>Hoje</p>
            </Link>
            <Link to="/historico">
                <p>Histórico</p>
            </Link>
        </Conteiner>
    );
}

const Conteiner = styled.div`
    height: 70px;
    max-width: 500px;
    width: 100%;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 31px;

    a {
        text-decoration: none;
    }

    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #52B6FF;
    }
`;