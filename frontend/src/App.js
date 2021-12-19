import './App.css';
import Bet from './components/BetComponent';

let game = "CS GO";
let team1 = "NAVI";
let team2 = "Vitallity";

function App() {
  return (
    <div className="App">
      <header>
        <div class="logo-div">
          <img src="./favicon.ico" alt="logo"/>
          <p>esbet</p>
        </div>
        <h2>Faça a sua aposta torcedor!</h2>
      </header>
      <Bet jogo={game} team1={team1} team2={team2}/>
    </div>
  );
}

export default App;
