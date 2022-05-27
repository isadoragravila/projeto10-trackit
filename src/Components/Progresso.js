import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import PercentualContext from "../Contexts/PercentualContext";

export default function Progresso({ habitos }) {
    const concluidos = habitos.filter(habito => habito.done === true);
    const porcentagem = Math.ceil((concluidos.length) / (habitos.length) * 100);
    const { setPercentual } = useContext(PercentualContext);
    //verificar depois
    useEffect(() => {
        if (habitos.length !== 0) {
            setPercentual(porcentagem);
        } else {
            setPercentual(0);
        }
    }, [habitos]);

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

const Subtitulo = styled.div`
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: ${props => props.cor};
        }
`;