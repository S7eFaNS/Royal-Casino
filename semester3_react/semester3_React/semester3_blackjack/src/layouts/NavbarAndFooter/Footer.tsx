import { useState } from "react";
import "../Utils/Features/Background.css"
import { Button, Modal } from "react-bootstrap";

export const Footer = () => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const handleRuleButton = async () => {
        setShowLeaderboard(true);
      };

      const handleRulesClose = () => {
        setShowLeaderboard(false);
      };

    return (
        <div className="main-color static-bottom"> 
            <footer className="container d-flex flex-wrap
                justify-content-between align-items-center py-5 main-color">
                <p className="col-md-4 mb-0 text-white">@Black jack app</p>
                <ul className="nav navbar-dark col-md-4 justify-content-end">
                    <li className="nav-item" onClick={handleRuleButton}>
                        <button className="nav-link px-2 text-white">Rules</button>
                    </li>
                    <Modal show={showLeaderboard} onHide={handleRulesClose} >
              <Modal.Header closeButton style={{backgroundColor:"#4f1098", color:"white"}}>
                <Modal.Title>Rules</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div>
                    <h3>Objective:</h3>
                    <p>Get a hand value closer to 21 than the dealer without going over.</p>

                    <h3>Card Values:</h3>
                    <ul>
                        <li>Number cards: face value</li>
                        <li>Face cards (Jack, Queen, King): 10 points</li>
                        <li>Aces: 1 or 11 points</li>
                    </ul>

                    <h3>Gameplay:</h3>
                    <ol>
                        <li>Each player gets two cards.</li>
                        <li>Decide to "hit" (get another card) or "stand" (keep current hand).</li>
                        <li>Dealer reveals cards and hits until 17 or higher.</li>
                        <li>Win by having a closer hand to 21 without busting.</li>
                    </ol>

                    <h3>Winning:</h3>
                    <ul>
                        <li>Standard *2 payout.</li>
                        <li>Blackjack *2.5 payout.</li>
                    </ul>
                </div>

              </Modal.Body>
            </Modal>
                    <li className="nav-item">
                        <a href="/" className="nav-link px-2 text-white">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/market" className="nav-link px-2 text-white">Buy Skins</a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}
