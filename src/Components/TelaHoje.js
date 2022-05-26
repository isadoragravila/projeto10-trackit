import dayjs from 'dayjs';
import locale from 'dayjs/locale/pt-br';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import Topo from "./Topo";

function Habitos({ habito }) {
    const [recorde, setRecorde] = useState(false);
    function click () {
        console.log("clicou");
        
    }
    useEffect(() => {
        if (habito.currentSequence === habito.highestSequence) {
            setRecorde(true);
        }
    }, []);

    return (
        <>
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
        </>
    );
}
export default function TelaHoje() {
    const now = dayjs().locale("pt-br");

    const habitos = [
        {id: 1, name: "Acordar", done: false, currentSequence: 1, highestSequence: 3 },
        {id: 2, name: "Comer", done: true, currentSequence: 2, highestSequence: 3 },
        {id: 3, name: "Dormir", done: true, currentSequence: 3, highestSequence: 3 }
    ];

    return (
        <>
            <Topo />
            <Conteiner>
                <Content>
                    <h2>{now.format("dddd, D/MM")}</h2>
                    <p>Nenhum hábito concluído ainda</p>
                </Content>
                {habitos.map((habito) => <Habitos key={habito.id} habito={habito} />)}
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
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #bababa;
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
    ion-icon {
        font-size: 55px;
        color: #FFFFFF;
    }
`; 