import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import Menu from './Menu';
import Topo from "./Topo";
import Habitos from './Habitos';
import CriarHabitos from './CriarHabitos';
import TokenContext from "../Contexts/TokenContext";

export default function TelaHabitos() {
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);
    const [habito, setHabito] = useState("");
    const [ids, setIds] = useState([]);
    const [meusHabitos, setMeusHabitos] = useState([]);
    const { token } = useContext(TokenContext);

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
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
                    {clicked ? <CriarHabitos setClicked={setClicked} habito={habito} setHabito={setHabito} ids={ids} setIds={setIds} setMeusHabitos={setMeusHabitos} /> : null}
                    {meusHabitos.length === 0 ?
                        (<p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                        ) : (
                            meusHabitos.map(item => <Habitos key={item.id} name={item.name} days={item.days} id={item.id} setMeusHabitos={setMeusHabitos} />)
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