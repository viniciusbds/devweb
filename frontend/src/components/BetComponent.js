import React, { useState } from "react";
import "./BetComponent.css"
function BetComponent(props) {
    
    const [team, setTeam] = useState(props.team1);
    const [betAmount, setBetAmount] = useState(0);

    const alerta = () => {alert(`apostou ${betAmount} R$ na equipe ${team}`)}

    return <form className="bet">
                <p><strong>{props.jogo} | {props.team1} vs {props.team2}</strong></p>

                <p>Escolha o time vencedor:</p>

                <select 
                value={team}
                onChange={(e) => {
                    const selectedTeam = e.target.value;
                    setTeam(selectedTeam);
                }}>
                    <option value={props.team1}>{props.team1}</option>
                    <option value={props.team2}>{props.team2}</option>
                </select>

                <section>
                <input type="number" id="contactChoice2" placeholder="Valor"
                onChange={(e) => {
                    setBetAmount(e.target.value);
                }}/>
                </section>

                <p>* Confirmo a aposta de <strong>{betAmount} R$</strong> na equipe <strong>{team}</strong></p>
                <button type="button" onClick={alerta}>Apostar</button>

            </form>
            
}

export default BetComponent;