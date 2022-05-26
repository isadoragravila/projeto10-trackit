import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Menu from './Menu';
import Topo from "./Topo";
import { ThreeDots } from 'react-loader-spinner';
import TokenContext from "../Contexts/TokenContext";

function Box({ index, dia, ids, setIds, isLoading }) {
    const [isChecked, setIsChecked] = useState(marcado);

    function marcado() {
        for (let i = 0; i < ids.length; i++) {
            if (index === ids[i]) {
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
        <>
            {isLoading ? (
                <Checkbox disabled cor={isChecked ? "#FFFFFF" : "#CFCFCF"} letra={isChecked ? "#DBDBDB" : "#FFFFFF"}>
                    {dia}
                </Checkbox>
            ) : (
                <Checkbox cor={isChecked ? "#FFFFFF" : "#CFCFCF"} letra={isChecked ? "#DBDBDB" : "#FFFFFF"} onClick={mudaCor}>
                    {dia}
                </Checkbox>
            )}
        </>
    );
}

function CriarHabitos({ setClicked, habito, setHabito, ids, setIds, token, setMeusHabitos }) {
    const week = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [isLoading, setIsLoading] = useState(false);

    function enviar() {
        setIsLoading(true);
        const body = { name: habito, days: ids };
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);

        promise.then(() => {
            setClicked(false);
            setHabito("");
            setIds([]);
            setIsLoading(false);
            getHabitos();
        });
        promise.catch(err => {
            alert(err.response.data.message);
            setIsLoading(false);
        });
    }

    function cancelar() {
        setClicked(false);
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
        <CriarHabito>
            {isLoading ? (
                <Input type="text" disabled placeholder="nome do hábito" value={habito} cor={"#F2F2F2"} letra={"#AFAFAF"} />
            ) : (
                <Input type="text" placeholder="nome do hábito" value={habito} onChange={(e) => setHabito(e.target.value)} cor={"#FFFFFF"} letra={"#666666"} />
            )}
            <Semana>
                {week.map((dia, index) => <Box key={index} index={index} dia={dia} ids={ids} setIds={setIds} isLoading={isLoading} />)}
            </Semana>
            {isLoading ? (
                <Botoes>
                    <Cancelar opacity={0.7} disabled>Cancelar</Cancelar>
                    <Enviar opacity={0.7} disabled>{<ThreeDots color={"#ffffff"} width={43} />}</Enviar>
                </Botoes>
            ) : (
                <Botoes>
                    <Cancelar opacity={1} onClick={()=> setClicked(false)}>Cancelar</Cancelar>
                    <Enviar opacity={1} onClick={enviar}>Enviar</Enviar>
                </Botoes>
            )}
        </CriarHabito>
    );
}

function Box2({ index, dia, days }) {
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

function Habitos({ name, days }) {
    const week = ["D", "S", "T", "Q", "Q", "S", "S"];

    function excluir() {
        console.log("exclui");
    }

    return (
        <Habito>
            <ion-icon name="trash-outline" onClick={excluir}></ion-icon>
            <h3>{name}</h3>
            <Semana>
                {week.map((dia, index) => <Box2 key={index} index={index} dia={dia} days={days} />)}
            </Semana>
        </Habito>
    );
}

export default function TelaHabitos() {
    const [clicked, setClicked] = useState(false);
    const [habito, setHabito] = useState("");
    const [ids, setIds] = useState([]);
    const [meusHabitos, setMeusHabitos] = useState([]);
    const { token } = useContext(TokenContext);

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then(response => {
            setMeusHabitos(response.data);
        });
    }, []);

    return (
        <>
            <Topo />
            <Conteiner>
                <Content>
                    <Titulo>
                        <h2>Meus hábitos</h2>
                        <Botao onClick={() => setClicked(true)}>+</Botao>
                    </Titulo>
                    {clicked ? <CriarHabitos setClicked={setClicked} habito={habito} setHabito={setHabito} ids={ids} setIds={setIds} token={token} setMeusHabitos={setMeusHabitos} /> : null}
                    {meusHabitos.length === 0 ?
                        (<p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                        ) : (
                            meusHabitos.map(item => <Habitos key={item.id} name={item.name} days={item.days} />)
                        )}
                </Content>
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

const Checkbox = styled.button`
    width: 30px;
    height: 30px;
    margin-right: 4px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    cursor: pointer;
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

const Habito = styled.div`
    width: 100%;
    height: 91px;
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
    }

    ion-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #666666;
        font-size: 20px;
    }
`;