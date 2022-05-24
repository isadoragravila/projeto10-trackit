import styled from 'styled-components';

export default function Menu () {
    return (
        <Conteiner>
            <p>Hábitos</p>
            <p>Hoje</p>
            <p>Histórico</p>
        </Conteiner>
    );
}

const Conteiner = styled.div`
    height: 70px;
    max-width: 500px;
    width: 100%;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 31px;

    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #52B6FF;
    }
`;