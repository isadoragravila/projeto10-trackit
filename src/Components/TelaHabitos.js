import { useState } from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import Topo from "./Topo";

function Box({ index, dia, ids, setIds }) {
    const [isChecked, setIsChecked] = useState(marcado);

    function marcado () {
        for (let i = 0; i < ids.length; i++) {
            if(index === ids[i]) {
                return false;
            }
        }
        return true;
    }

    function mudaCor() {
        setIsChecked(!isChecked);
        if (isChecked) {
            setIds([...ids, index]);
          } else {
            setIds(ids.filter((item) => item !== index));
          }
    }

    return (
        <Checkbox cor={isChecked ? "#FFFFFF" : "#CFCFCF"} letra={isChecked ? "#DBDBDB" : "#FFFFFF" } onClick={mudaCor}>
            {dia}
        </Checkbox>
    );
}

function CriarHabitos({ setClicked, habito, setHabito, ids, setIds }) {
    const week = ["D", "S", "T", "Q", "Q", "S", "S"];

    function enviar () {
        setClicked(false);
        setHabito("");
        setIds([]);
    }

    function cancelar () {
        setClicked(false);
    }

    return (
        <CriarHabito>
            <Input type="text" placeholder="nome do hábito" value={habito} onChange={(e) => setHabito(e.target.value)} cor={"#FFFFFF"} letra={"#666666"} />
            <Semana>
                {week.map((dia, index) => <Box key={index} index={index} dia={dia} ids={ids} setIds={setIds} />)}
            </Semana>
            <Botoes>
                <Cancelar onClick={cancelar}>Cancelar</Cancelar>
                <Enviar onClick={enviar}>Enviar</Enviar>
            </Botoes>
        </CriarHabito>
    );
}

export default function TelaHabitos() {
    const [clicked, setClicked] = useState(false);
    const [habito, setHabito] = useState("");
    const [ids, setIds] = useState([]);

    return (
        <>
            <Topo />
            <Conteiner>
                <Content>
                    <Titulo>
                        <h2>Meus hábitos</h2>
                        <Botao onClick={() => setClicked(true)}>+</Botao>
                    </Titulo>
                    {clicked ? <CriarHabitos setClicked={setClicked} habito={habito} setHabito={setHabito} ids={ids} setIds={setIds} /> : null}
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
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
 
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`;

const Titulo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    
    h2 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
        line-height: 35px;
        color: #126BA5;
    }
`;

const Botao = styled.div`
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 27px;
    color: #FFFFFF;
    cursor: pointer;
`;

const CriarHabito = styled.div`
    width: 100%;
    height: 180px;
    margin-bottom: 28px;
    padding: 18px;
    background-color: #FFFFFF;
    border-radius: 5px;
`;

const Input = styled.input`
    width: 100%;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-bottom: 8px;
    outline: none;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20px;
    text-indent: 10px;
    color: ${props => props.letra};
    background-color: ${props => props.cor};

    ::placeholder {
        color: #DBDBDB;
    }
`;

const Semana = styled.div`
    display: flex;
    margin-bottom: 29px;
`;

const Checkbox = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 4px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20px;
    color: ${props => props.letra};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.cor};
`;

const Botoes = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Enviar = styled.button`
    width: 84px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    opacity: ${props => props.opacity};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Cancelar = styled.button`
    width: 84px;
    height: 35px;
    margin-right: 15px;
    background-color: #FFFFFF;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 16px;
    color: #52B6FF;
    opacity: ${props => props.opacity};
    display: flex;
    align-items: center;
    justify-content: center;
`;