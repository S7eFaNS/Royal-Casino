/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const StyledCard = ({ card, hide }: { card: any, hide: any }) => {
    const cardStyle: React.CSSProperties = {
        width: "120px",
        height: "180px",
        color: card === null || hide ? "black" : card.suit === "♥" || card.suit === "♦" ? "red" : "black",
        border: "3px solid grey",
        borderRadius: "8px",
        boxShadow: "0 0 4px #000",
        backgroundColor: card === null || hide ? "black" : "white", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px",
    };

    const topAndBottom = card === null || hide ? "" : card.rank;
    const middle = card === null || hide ? "" : card.suit;

    return (
    <div style={cardStyle}>
      <div className="top" style={{ fontSize: "55px", height: "30px" }}>
        {topAndBottom}
      </div>
      <div className="middle" style={{ fontSize: "65px", height: "70px", lineHeight: "60px" }}>
        {middle}
      </div>
      <div className="bottom" style={{ height: "30px", display: "none" }}>
        {topAndBottom}
      </div>
    </div>
  );
};

export default StyledCard;
