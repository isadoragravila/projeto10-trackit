import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import logo from '../Assets/logo.png';
import { ThreeDots } from  'react-loader-spinner';

export default function TelaCadastro() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function fazerCadastro (event) {
        event.preventDefault();
        setIsLoading(true);
        const body = { email, name, image, password };
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);

        promise.then(() => {
            navigate("/");
        });
        promise.catch(err => {
            alert(err.response.data.message);
            setIsLoading(false);
        });
    }

    return (
        <Conteiner>
            <img src={logo} alt='logo' />
            <h1>TrackIt</h1>
            <Form onSubmit={fazerCadastro}>
                <Input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} cor={isLoading ? "#F2F2F2" : "#FFFFFF"} />
                <Input type="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} cor={isLoading ? "#F2F2F2" : "#FFFFFF"} />
                <Input type="text" placeholder="nome" value={name} onChange={(e) => setName(e.target.value)} cor={isLoading ? "#F2F2F2" : "#FFFFFF"} />
                <Input type="url" placeholder="foto" value={image} onChange={(e) => setImage(e.target.value)} cor={isLoading ? "#F2F2F2" : "#FFFFFF"} />
                {isLoading ? (
                    <Button type="submit" disabled opacity={0.7}>{<ThreeDots color={"#ffffff"} width={51} />}</Button>
                    ) : (
                    <Button type="submit" opacity={1}>Cadastrar</Button>
                )}
            </Form>
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 33px;
    margin-bottom: 25px;
`;

const Input = styled.input`
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-bottom: 6px;
    outline: none;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20px;
    text-indent: 10px;
    color: #AFAFAF;
    background-color: ${props => props.cor};

    ::placeholder {
        color: #DBDBDB;
    }
`;

const Button = styled.button`
    width: 303px;
    height: 45px;
    background-color: #52B6FF;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 21px;
    color: #FFFFFF;
    opacity: ${props => props.opacity};
    display: flex;
    align-items: center;
    justify-content: center;
`;