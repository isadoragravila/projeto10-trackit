import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import PercentualContext from "../Contexts/PercentualContext";

export default function Menu() {
    const {percentual} = useContext(PercentualContext);
    
    return (
        <Conteiner>
            <Link to="/habitos">
                <p>Hábitos</p>
            </Link>
            <Progresso>
                <Link to="/hoje">
                    <CircularProgressbar value={percentual} text={"Hoje"} background backgroundPadding={6} styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#ffffff",
                        pathColor: "#ffffff",
                        textSize: "18px",
                        trailColor: "transparent",
                        textFamily: "arial"
                    })}
                    />
                </Link>
            </Progresso>
            <Link to="/historico">
                <p>Histórico</p>
            </Link>
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
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 31px;

    a {
        text-decoration: none;
    }

    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #52B6FF;
        margin-bottom: 26px;
    }
`;

const Progresso = styled.div`
    width: 91px;
    padding-bottom: 10px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
`;