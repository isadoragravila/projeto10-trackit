import { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import Menu from './Menu';
import Topo from "./Topo";
import TokenContext from "../Contexts/TokenContext";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import dayjs from 'dayjs';

function Historico({ habits, day }) {
    return (
        <ListaHabitos>
            {day}
            {habits.map(habito => <Habito key={habito.id} cor={habito.done ? "#8FC549" : "#ea5766"}>{habito.name}</Habito>)}
        </ListaHabitos>
    );
}

export default function TelaHistorico() {
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);
    const [historico, setHistorico] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [habits, setHabits] = useState([]);
    const [day, setDay] = useState('');

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
                setHistorico(response.data);
            });
            promise.catch(err => {
                alert(err.response.data.message);
            });
        }
    }, []);

    function tileClassName({ date, view }) {
        if (view === "month") {
            const dia = historico.find((d) => d.day === dayjs(date).format("DD/MM/YYYY"));
            if (dia) {
                const naoFeitos = dia.habits.filter((d) => d.done === false);
                if (naoFeitos.length === 0) {
                    return "feito";
                }
                return "nao-feito";
            }
        }
    }

    function clickDia(value) {
        const dia = historico.find((d) => d.day === dayjs(value).format("DD/MM/YYYY"));
        if (dia) {
            setClicked(true);
            setHabits(dia.habits);
            setDay(dayjs(value).format("DD/MM/YYYY"));
        } else {
            setClicked(false);
        }
    }

    return (
        <>
            <Topo />
            <Conteiner>
                <Content>
                    <h2>Histórico</h2>
                    <Calendar locale="pt-br" className="calendario" tileClassName={tileClassName} onClickDay={clickDia} />
                    {clicked ? <Historico habits={habits} day={day} /> : null}
                </Content>
            </Conteiner>
            <Menu />
        </>
    );
}

const Conteiner = styled.div`
    margin-top: 70px;
    margin-bottom: 70px;
    min-height: 100vh;
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

const ListaHabitos = styled.div`
    width: 100%;
    margin-top: 15px;
    background-color: #FFFFFF;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    text-indent: 18px;
    padding-top: 18px;
`;

const Habito = styled.div`
    width: 100%;
    padding: 18px 0;
    color: ${props => props.cor};
`;