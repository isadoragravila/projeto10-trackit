import { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Menu from './Menu';
import Topo from "./Topo";
import TokenContext from "../Contexts/TokenContext";

export default function TelaHistorico () {
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);
    
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <Topo />
            <Conteiner>
                <Content>
                    <h2>Histórico</h2>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </Content>
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
    padding: 0 17px;
`;

const Content = styled.div`
    padding-top: 28px;
    h2 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
        line-height: 35px;
        color: #126BA5;
        margin-bottom: 28px;
    }
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`;