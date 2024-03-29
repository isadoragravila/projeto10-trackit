import "../Assets/reset.css";
import "../Assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";
import TokenContext from "../Contexts/TokenContext";
import ImgContext from "../Contexts/ImgContext";
import PercentualContext from "../Contexts/PercentualContext";

export default function App() {
  const [token, setToken] = useState('');
  const [img, setImg] = useState('');
  const [percentual, setPercentual] = useState(0);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <ImgContext.Provider value={{ img, setImg }}>
        <PercentualContext.Provider value={{ percentual, setPercentual }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TelaLogin />} />
              <Route path="/cadastro" element={<TelaCadastro />} />
              <Route path="/habitos" element={<TelaHabitos />} />
              <Route path="/hoje" element={<TelaHoje />} />
              <Route path="/historico" element={<TelaHistorico />} />
            </Routes>
          </BrowserRouter>
        </PercentualContext.Provider>
      </ImgContext.Provider>
    </TokenContext.Provider>
  );
}


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;