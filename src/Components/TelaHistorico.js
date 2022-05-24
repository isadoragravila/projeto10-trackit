import styled from 'styled-components';
import Menu from './Menu';
import Topo from "./Topo";

export default function TelaHistorico () {
    return (
        <>
            <Topo />
            <Conteiner>
                <Content>
                    <h2>Tela historico</h2>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
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
        color: #126BA5;
        margin-bottom: 17px;
    }
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`;