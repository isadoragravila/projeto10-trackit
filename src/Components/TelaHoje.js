import dayjs from 'dayjs';
import locale from 'dayjs/locale/pt-br';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import Menu from './Menu';
import Topo from "./Topo";
import HabitosHoje from './HabitosHoje';
import Progresso from './Progresso';
import TokenContext from "../Contexts/TokenContext";

export default function TelaHoje() {
    const now = dayjs().locale("pt-br");
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);
    const [habitos, setHabitos] = useState([]);

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
            promise.then(response => {
                setHabitos(response.data);
            });
            promise.catch(err => {
                alert(err.response.data.message);
            });
        }
    }, []);

    return (
        <>
            <Topo />
            <Conteiner>
                <Content>
                    <h2>{now.format("dddd, D/MM")}</h2>
                    <Progresso habitos={habitos} />
                </Content>
                {habitos.map((habito) => <HabitosHoje key={habito.id} habito={habito} setHabitos={setHabitos} />)}
            </Conteiner>
            <Menu />
        </>
    );
}

const Conteiner = styled.div`
    margin-top: 70px;
    min-height: 100vh;
    margin-bottom: 70px;
    background-color: #E5E5E5;
    max-width: 500px;
    min-width: 375px;
    padding: 0 17px;
`;

const Content = styled.div`
    padding-top: 28px;
    margin-bottom: 28px;
    h2 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
        line-height: 35px;
        color: #126BA5;
    }
`;
