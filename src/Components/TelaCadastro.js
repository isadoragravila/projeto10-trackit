import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import logo from '../Assets/logo.png';

export default function TelaCadastro() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function fazerCadastro (event) {
        event.preventDefault();
        
        const body = {
            email,
            name,
	        image,
	        password
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);

        promise.then(() => {
            navigate("/");
        });

        promise.catch(err => {
            alert(err.response.data.message);
        });
    }
    return (
        <Conteiner>
            <img src={logo} alt='logo' />
            <h1>TrackIt</h1>
            <form onSubmit={fazerCadastro}>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="nome" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="url" placeholder="foto" value={image} onChange={(e) => setImage(e.target.value)} />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/">
                <Login>
                    Já tem uma conta? Faça login!
                </Login>
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

const Login = styled.div`
    height: 17px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 14px;
    text-decoration-line: underline;
    color: #52B6FF;
`;