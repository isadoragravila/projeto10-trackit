import { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import Menu from './Menu';
import Topo from "./Topo";
import TokenContext from "../Contexts/TokenContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/pt-br';

export default function TelaHistorico () {
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);
    const now = dayjs().locale("pt-br");
    
    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config);
            promise.then(response => {
                console.log(response.data);
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
                    <h2>Histórico</h2>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                    <Calendar locale="pt-br" className="calendario"/>
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