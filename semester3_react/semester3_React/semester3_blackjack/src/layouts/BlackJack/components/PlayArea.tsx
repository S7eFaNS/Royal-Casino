/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "./Card";
import * as BJUtilities from "../../Utils/Features/BlackJackUtilities";
import { useEffect, useState } from "react";

export default function PlayArea(props : any) {

  const [gameResult, setGameResult] = useState<string | null>(null);

  useEffect(() => {
    if (props.isTurnEnd) {
      BJUtilities.judge(props.dealersHand, props.playersHand, props.userId, props.gambleAmount, props.setBalance)
        .then((result) => {
          setGameResult(result);
        })
        .catch((error) => {
          console.error('Error while judging the game:', error);
        });
    }
  }, [props.isTurnEnd, props.dealersHand, props.playersHand, props.userId, props.gambleAmount]);

  return (
    <div style={{margin: "50px 25px"}}>
      <div > 
        <div style={{paddingBottom:"50px"}}>
          <div
            className="arrow_box_common arrow_box_dealer"
            style={{ visibility: props.isTurnEnd ? "visible" : "hidden", color: "white" }}
          >
            {props.dealersHand.length !== 0 &&
              BJUtilities.getScoreForDisplay(props.dealersHand)}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {props.dealersHand.map((card : any, index : any) => {
              const hide = index === 1 && !props.isTurnEnd ? true : false;
              return (
                <div  key={index}>
                  <Card card={card} hide={hide} />
                </div>
                
              );
            })}
          <p style={{fontSize:"25px", fontWeight: "bold", color: "white"}}>Dealer</p>
          </div>
        </div>
        <div >
          <div style={{ display: "flex", gap: "10px" }}>
            {props.playersHand.map((card : any, index : any) => {
              return (
                <div key={index}>
                  <Card card={card} hide={false} />
                </div>
              );
            })}
            <p style={{fontSize:"25px", fontWeight: "bold", color: "white"}}>You</p>
          </div>
          <div className="arrow_box_common arrow_box_player" style={{color: "white"}}>
        {props.playersHand.length !== 0 &&
          BJUtilities.getScoreForDisplay(props.playersHand)}
      </div>
          <div style={{ height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {props.isTurnEnd && (
                  <div
                  style={{
                    border: "1px solid black",
                    backgroundColor: "grey",
                    height: "40px",
                    fontSize: "1.3em",
                    fontWeight: "bold",
                    color: "white",
                    lineHeight: "40px",
                    opacity: "0.8"
                  }}
                >
                {gameResult}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
