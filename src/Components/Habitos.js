import { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TokenContext from "../Contexts/TokenContext";

function Box({ index, dia, days }) {
    const [isChecked, setIsChecked] = useState(marcado);

    function marcado() {
        for (let i = 0; i < days.length; i++) {
            if (index === days[i]) {
                return false;
            }
        }
        return true;
    }

    return (
        <Checkbox cor={isChecked ? "#FFFFFF" : "#CFCFCF"} letra={isChecked ? "#DBDBDB" : "#FFFFFF"}>
            {dia}
        </Checkbox>
    );
}

export default function Habitos({ name, days, id, setMeusHabitos }) {
    const week = ["D", "S", "T", "Q", "Q", "S", "S"];
    const { token } = useContext(TokenContext);

    function excluir() {
        const confirmBox = window.confirm(
            "Você tem certeza que deseja excluir esse hábito?"
        )
        if (confirmBox === true) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
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
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then(response => {
            setMeusHabitos(response.data);
        });
    }

    return (
        <Habito>
            <ion-icon name="trash-outline" onClick={excluir}></ion-icon>
            <h3>{name}</h3>
            <Semana>
                {week.map((dia, index) => <Box key={index} index={index} dia={dia} days={days} />)}
            </Semana>
        </Habito>
    );
}

const Semana = styled.div`
    display: flex;
`;

const Checkbox = styled.button`
    width: 30px;
    height: 30px;
    margin-right: 4px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20px;
    line-height: 22px;
    color: ${props => props.letra};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.cor};
`;

const Habito = styled.div`
    width: 100%;
    min-height: 91px;
    margin-bottom: 10px;
    padding: 15px;
    background-color: #FFFFFF;
    border-radius: 5px;
    position: relative;
    h3 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        color: #666666;
        font-size: 20px;
        margin-bottom: 10px;
        word-break: break-word;
        width: calc(100% - 20px);
    }
    ion-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #666666;
        font-size: 20px;
        cursor: pointer;
    }
`;