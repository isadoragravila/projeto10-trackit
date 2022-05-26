import dayjs from 'dayjs';
import locale from 'dayjs/locale/pt-br';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Menu from './Menu';
import Topo from "./Topo";
import TokenContext from "../Contexts/TokenContext";
import PercentualContext from "../Contexts/PercentualContext";

function Habitos({ habito, token, setHabitos }) {
    const [recorde, setRecorde] = useState(false);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        if (habito.currentSequence === habito.highestSequence && habito.done) {
            setRecorde(true);
        } else {
            setRecorde(false);
        }
        if (habito.done) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    }, [habito]);

    function click() {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        if (check) {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`, null, config);

            promise.then(() => {
                getHabitos();
            });
            promise.catch(err => {
                alert(err.response.data.message);
            });
        } else {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`, null, config);

            promise.then(() => {
                getHabitos();
            });
            promise.catch(err => {
                alert(err.response.data.message);
            });
        }
    }

    function getHabitos() {
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

    return (
            <Habito>
                <Texto>
                    <h3>{habito.name}</h3>
                    <Sequencia cor={habito.done ? "#8FC549" : "#666666"}>
                        Sequência atual: <span>{habito.currentSequence} dias</span>
                    </Sequencia>
                    <Recorde cor={recorde ? "#8FC549" : "#666666"}>
                        Seu recorde: <span>{habito.highestSequence} dias</span>
                    </Recorde>
                </Texto>
                <Check onClick={click} cor={habito.done ? "#8FC549" : "#EBEBEB"}>
                    <ion-icon name="checkmark"></ion-icon>
                </Check>
            </Habito>
    );
}

function Progresso({habitos}) {
    const concluidos = habitos.filter(habito => habito.done === true);
    const porcentagem = Math.ceil((concluidos.length)/(habitos.length)*100);
    const {setPercentual} = useContext(PercentualContext);

    useEffect(() => {
        setPercentual(porcentagem);
    }, [porcentagem]);

    return (
        <Subtitulo cor={concluidos.length === 0 ? "#BABABA" : "#8FC549"}>
            {concluidos.length === 0 ? (
                <p>Nenhum hábito concluído ainda</p>
            ) : (
                <p>{porcentagem}% dos hábitos concluídos</p>
            )}
        </Subtitulo>
    );
}

export default function TelaHoje() {
    const now = dayjs().locale("pt-br");
    const { token } = useContext(TokenContext);
    const [habitos, setHabitos] = useState([]);

    useEffect(() => {
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
    }, []);

    return (
        <>
            <Topo />
            <Conteiner>
                <Content>
                    <h2>{now.format("dddd, D/MM")}</h2>
                    <Progresso habitos={habitos} />
                </Content>
                {habitos.map((habito) => <Habitos key={habito.id} habito={habito} token={token} setHabitos={setHabitos} />)}
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

const Subtitulo = styled.div`
    p {
            font-family: 'Lexend Deca';
            font-weight: 400;
            font-size: 18px;
            line-height: 22px;
            color: ${props => props.cor};
        }
`;

const Habito = styled.div`
    width: 100%;
    min-height: 94px;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Texto = styled.div`
    min-height: 94px;
    width: calc(100% - 75px);
    padding: 13px 0 17px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        color: #666666;
        font-size: 20px;
        line-height: 25px;
        word-break: break-word;
    }
`;

const Sequencia = styled.div`
    font-family: 'Lexend Deca';
    font-weight: 400;
    color: #666666;
    font-size: 13px;
    line-height: 16px;
    span {
        color: ${props => props.cor};
    }
`;

const Recorde = styled.div`
    font-family: 'Lexend Deca';
    font-weight: 400;
    color: #666666;
    font-size: 13px;
    line-height: 16px;
    span {
        color: ${props => props.cor};
    }
`;

const Check = styled.div`
    width: 69px;
    height: 69px;
    background-color: ${props => props.cor};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ion-icon {
        font-size: 55px;
        color: #FFFFFF;
    }
`; 