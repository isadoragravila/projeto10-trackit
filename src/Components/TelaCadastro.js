import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function TelaCadastro() {
    return (
        <Cadastro>
            <img src='' alt='logo' />
            <h1>TrackIt</h1>
            <form>
                <input type="email" placeholder="email" required />
                <input type="password" placeholder="senha" required />
                <input type="text" placeholder="nome" required />
                <input type="url" placeholder="foto" required />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/">
                <Login>
                    Já tem uma conta? Faça login!
                </Login>
            </Link>
        </Cadastro>
    );
}

const Cadastro = styled.div`
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
`;

const Login = styled.div`
    height: 17px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 14px;
    text-decoration-line: underline;
    color: #52B6FF;
`;