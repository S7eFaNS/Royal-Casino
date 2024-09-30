/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useReducer, useState } from "react";
import PlayArea from "./PlayArea";
import BlackJackButtons from "./BlackJackButtons";
import GameProgressButton from "./GameProgressButton";
import * as BlackJackUtilities from "../../Utils/Features/BlackJackUtilities";
import { Toaster } from "react-hot-toast";
import { useBalance } from "../../Utils/Features/BalanceContext";
import { Flip, Zoom, toast } from "react-toastify";
import { placeBet } from "../../Utils/API_Calls/Blackjack/FetchPlaceBet";
import TokenManager from "../../Utils/API_Calls/JWT/TokenManager";
import { fetchUserData } from "../../Utils/API_Calls/User/UserApiBalance";
import { Button } from "react-bootstrap";


const initialDeck = BlackJackUtilities.getDeck(3);
const penetration = 0.8;

const initialState = {
  deck: initialDeck,
  minimumNumber: getMinimumNumber(initialDeck, penetration),
  dealersHand: [],
  playersHand: [],
  isTurnEnd: false
};

function getMinimumNumber(initialDeck : any, penetration : any) {
  return initialDeck.length - Math.floor(initialDeck.length * penetration);
}

function dealForDealer(deck : any, hand : any) {
  const newDeck = deck.slice();
  const newHand = hand.slice();
  while (BlackJackUtilities.checkDealersScore(newHand)) {
    const index = Math.floor(Math.random() * newDeck.length);
    newHand.push(newDeck[index]);
    newDeck.splice(index, 1);
  }
  return [newDeck, newHand];
}

function deal(deck : any, hand : any, time : any) {
  const newDeck = deck.slice();
  const newHand = hand.slice();
  for (let i = 0; i < time; i++) {
    const index = Math.floor(Math.random() * newDeck.length);
    newHand.push(newDeck[index]);
    newDeck.splice(index, 1);
  }
  return [newDeck, newHand];
}

function initDealersHand(state : any) {
  const [newDeck, newHand] = deal(state.deck, [], 2);
  return { ...state, deck: newDeck, dealersHand: newHand };
}

function initPlayersHand(state : any) {
  const [newDeck, newHand] = deal(state.deck, [], 2);
  return { ...state, deck: newDeck, playersHand: newHand };
}

function reducer(state : any, action : any) {
  switch (action.type) {
    case "init": {
      state = initDealersHand(state);
      state = initPlayersHand(state);
      return { ...state, isTurnEnd: false };
    }
    case "hit": {
      const [newDeck, newHand] = deal(state.deck, state.playersHand, 1);
      return { ...state, deck: newDeck, playersHand: newHand };
    }
    case "stand": {
      const [newDeck, newHand] = dealForDealer(state.deck, state.dealersHand);
      return { ...state, deck: newDeck, dealersHand: newHand, isTurnEnd: true };
    }
    case "check": {
      if (
        BlackJackUtilities.isBlackJack(state.dealersHand) ||
        BlackJackUtilities.isBlackJack(state.playersHand)
      ) {
        return { ...state, isTurnEnd: true };
      }
      if (BlackJackUtilities.getTotal(state.playersHand) === 21) {
        const [newDeck, newHand] = dealForDealer(state.deck, state.dealersHand);
        return {
          ...state,
          deck: newDeck,
          dealersHand: newHand,
          isTurnEnd: true
        };
      }
      if (BlackJackUtilities.getTotal(state.playersHand) > 21) {
        return { ...state, isTurnEnd: true };
      }
      return { ...state };
    }
    case "shuffle": {
      const newDeck = BlackJackUtilities.getDeck(3);
      return { ...state, deck: newDeck };
    }
    default:
  }
}

export default function Border7() {
  const user = TokenManager.getUser();
  const userId = user?.userId
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setBalance } = useBalance();
  const [gambleAmount, setGambleAmount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleAmountChange = (event : any) => {
    setGambleAmount(event.target.value);
  };

  const startGame = async () => {
    try{
      await placeBet(userId , gambleAmount);
      toast.success(`Game started with gamble amount: ${Number(gambleAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}$`, {transition: Zoom, autoClose: 1000, theme: "colored", position: "top-right", className: "mt-3",});
      const updatedBalance = await fetchUserData(user?.userId || 0);
      setBalance(updatedBalance ?? null);
      setGameStarted(true);
    }
    catch(error : any){
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dispatch({ type: "init" });
    dispatch({ type: "check" });
  }, []);

  useEffect(() => {
    if (state.deck.length <= state.minimumNumber) {
      dispatch({ type: "shuffle" });
      toast.success("Shuffled!!", {
        style: {
          borderRadius: "10px",
          background: "#737373",
          color: "#ffffff"
        }
      });
    }
  }, [state.deck, state.minimumNumber]);

  function doHit() {
    dispatch({ type: "hit" });
    dispatch({ type: "check" });
  }

  function doStand() {
    dispatch({ type: "stand" });
  }

  async function next() {
    dispatch({ type: "init" });
    dispatch({ type: "check" });
    const updatedBalance = await fetchUserData(user?.userId);
    if (updatedBalance !== null && updatedBalance < gambleAmount) {
      setGameStarted(false);
      toast.error("You don't have enough balance to continue the game", {position: "top-center", autoClose:2500});
    } else{
      startGame();
    }
  }

  function getButtons(playersHand: any) {
    if (BlackJackUtilities.getTotal(playersHand) > 21 || state.isTurnEnd) {
      return <GameProgressButton onClickNext={next} />; 
    } else {
      return <BlackJackButtons onClickHit={doHit} onClickStand={doStand} />;
    }
  }

  const handleClickExit = () => {
    dispatch({ type: "init" });
    dispatch({ type: "check" });
    setGameStarted(false);
  };

  return (
    <div>
    {!gameStarted && (
      <div style={{ textAlign: 'center' }}>
        <label htmlFor="amountInput" style={{ color: 'white', marginTop: '30px', display: 'block', fontSize: '18px' }}>
          Select Gamble Amount:
        </label>
        <input
          type="number"
          id="amountInput"
          value={gambleAmount}
          onChange={handleAmountChange}
          style={{ fontSize: '18px', padding: '5px' }}
        />
        <button onClick={startGame} style={{ fontSize: '18px', padding: '8px', marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}
              disabled={!String(gambleAmount).trim() || isNaN(gambleAmount) || gambleAmount <= 0.99}>
          Start Game
        </button>
        <p style={{color:"white"}}>Minimum bet is $1</p>
      </div>
    )}
    {gameStarted && (
    <div style={{flex:"auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center",}}>
      <div>
        <Toaster reverseOrder={false} />
      </div>
      <PlayArea
        dealersHand={state.dealersHand}
        playersHand={state.playersHand}
        isTurnEnd={state.isTurnEnd}
        userId={userId}
        gambleAmount={gambleAmount}
        setBalance={setBalance}
      />
      <div style={{
        color: "#fff",
        marginBottom: "-40px"}}>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
      <div >{getButtons(state.playersHand)}</div>
      {state.isTurnEnd &&  (
              <Button style={{ backgroundColor: 'red', width: '13vh', marginLeft: '100px' }} variant="contained" onClick={handleClickExit}>
                New Game
              </Button>
      )}
          </div>
      <p style={{color:"white", fontSize:"22px"}}>Current bet: {Number(gambleAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}$</p>
    </div>
    )}
    </div>
  );
}
