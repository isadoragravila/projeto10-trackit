import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import logo from '../Assets/logo.png';

export default function TelaLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    function fazerLogin (event) {
        event.preventDefault();
        const body = {
            email,
	        password
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);

        promise.then(response => {
            setToken(response.data.token);
            navigate("/hoje");
        });

        promise.catch(err => {
            alert(err.response.data.message);
        });
    }

    return (
        <Conteiner>
            <img src={logo} alt='logo' />
            <h1>TrackIt</h1>
            <form onSubmit={fazerLogin}>
                <input type="email" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/cadastro">
                <Cadastro>
                    Não tem uma conta? Cadastre-se!
                </Cadastro>
            </Link>
        </Conteiner>
    );
}

const Conteiner = styled.div`
    max-width: 500px;
    min-width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 68px;

    h1 {
        font-family: 'Playball';
        font-weight: 400;
        font-size: 69px;
        color: #126BA5;
      }

    img {
        width: 182px;
        height: 102px;
    }
`;

const Cadastro = styled.div`
    height: 17px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 14px;
    text-decoration-line: underline;
    color: #52B6FF;
`;