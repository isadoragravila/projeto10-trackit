import styled from 'styled-components';
import Menu from './Menu';
import Topo from "./Topo";

export default function TelaHabitos() {
    return (
        <>
            <Topo />
            <Conteiner>
                <Content>
                    <Titulo>
                        <h2>Meus hábitos</h2>
                        <Botao>+</Botao>
                    </Titulo>
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
`;