/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flip, toast } from "react-toastify";
import { betWin } from "../API_Calls/Blackjack/FetchBetWin";
import { fetchUserData } from "../API_Calls/User/UserApiBalance";


export function getDeck(numberOfDeck = 1) {
    const suits = ["♠", "♣", "♥", "♦"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck: { suit: any; rank: any; }[] = [];

    for (let i = 0; i < numberOfDeck; i++) {
        suits.forEach((suit) =>
          ranks.forEach((rank) => deck.push({ suit: suit, rank: rank }))
        );
      }
      return deck;
}

export function getRankNum(rank: any){
    switch (rank) {
        case "A":
            return 1;
          case "J":
          case "Q":
          case "K":
            return 10;
          default:
            return Number(rank);
        }
}

export function getTotal(hand : any) {
    let total = 0;
    for (const card of hand) {
      total += getRankNum(card.rank);
    }
    return total;
}

export function hasAce(hand: any) {
for (const card of hand) {
    if (card.rank === "A") return true;
}
return false;
}

export function checkDealersScore(hand: any) {
    let total = getTotal(hand);
    if (isSoftHand(hand)) {
      total += 10;
    }
    if (total < 17) {
      return true;
    }
    return false;
}

export function isAce(card : any) {
    return card.rank === "A";
}
  
  export function isFaceCardOrTen(card : any) {
    if (getRankNum(card.rank) === 10) {
      return true;
    }
    return false;
}

export function isSoftHand(hand: any) {
    if (isBlackJack(hand)) {
      return false;
    }
    if (!hasAce(hand)) {
      return false;
    }
    if (getTotal(hand) + 10 < 21) {
      return true;
    }
    return false;
  }
  
  export function isBlackJack(hand: any[]) {
    const firstCard = hand[0];
    const secondCard = hand[1];
    if (
      (isAce(firstCard) && isFaceCardOrTen(secondCard)) ||
      (isFaceCardOrTen(firstCard) && isAce(secondCard))
    ) {
      return true;
    }
    return false;
  }
  
  export function getScore(hand: any[]) {
    if (isBlackJack(hand)) {
      return [21];
    }
    if (isSoftHand(hand)) {
      return [getTotal(hand), getTotal(hand) + 10];
    }
    return [getTotal(hand)];
  }
  
  export function getScoreForDisplay(hand: any[]) {
    let score = getScore(hand);
    if (isSoftHand(hand)) {
      return `${score[0]} | ${score[1]}`;
    }
    return score[0];
  }
  
  export function getLastScore(hand: any[]) {
    let score = getScore(hand);
    if (isSoftHand(hand)) {
      return score[1];
    }
    return score[0];
  }
  
  export async function judge(dealersHand: any[], playersHand: any[], userId: number, gambleAmount: number, setBalance: any) {

    const dealersScore = getLastScore(dealersHand);
    const playersScore = getLastScore(playersHand);
    if (getTotal(playersHand) > 21) {
      toast.error(`Dealer won! You lost -${Number(gambleAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}$`, {transition: Flip, autoClose: 1500, theme: "colored", position: "bottom-right", });
      return "LOSE!!";
    }
    if (dealersScore === playersScore) {
      await betWin(userId, gambleAmount);
      const updatedBalance = await fetchUserData(userId || 0);
      setBalance(updatedBalance ?? null);
      toast.success(`TIE: +${Number(gambleAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}$`, {transition: Flip, autoClose: 1500, theme: "colored", position: "bottom-right", });
      return "PUSH";
    }
    if (isBlackJack(playersHand)) {
      await betWin(userId, (gambleAmount * 2.5));
      const updatedBalance = await fetchUserData(userId || 0);
      setBalance(updatedBalance ?? null);
      toast.success(`Blackjack! You won +${(gambleAmount * 2.5).toLocaleString('en-US', { maximumFractionDigits: 2 })}$`, {transition: Flip, autoClose: 1500, theme: "colored", position: "bottom-right", });
      return "BLACK JACK!!";
    }
    if (isBlackJack(dealersHand)) {
      toast.error(`Dealer has Blackjack! You lost -${Number(gambleAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}$`, {transition: Flip, autoClose: 1500, theme: "colored", position: "bottom-right", });
      return "LOSE!!";
    }
    if (dealersScore > 21) {
      await betWin(userId, (gambleAmount * 2));
      const updatedBalance = await fetchUserData(userId || 0);
      setBalance(updatedBalance ?? null);
      toast.success(`You won +${(gambleAmount * 2).toLocaleString('en-US', { maximumFractionDigits: 2 })}$`, {transition: Flip, autoClose: 1500, theme: "colored", position: "bottom-right", });
      return "WIN!!";
    }
    if (dealersScore < playersScore) {
      await betWin(userId, (gambleAmount * 2));
      const updatedBalance = await fetchUserData(userId || 0);
      setBalance(updatedBalance ?? null);
      toast.success(`You won +${(gambleAmount * 2).toLocaleString('en-US', { maximumFractionDigits: 2 })}$`, {transition: Flip, autoClose: 1500, theme: "colored", position: "bottom-right", });
      return "WIN!!";
    }
    if (dealersScore > playersScore) {
      toast.error(`Dealer won! You lost -${Number(gambleAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}$`, {transition: Flip, autoClose: 1500, theme: "colored", position: "bottom-right"});
      return "LOSE!!";
    }

    await betWin(userId, (gambleAmount * 2));
    const updatedBalance = await fetchUserData(userId || 0);
    setBalance(updatedBalance ?? null);
    toast.success(`You won +${(gambleAmount * 2).toLocaleString('en-US', { maximumFractionDigits: 2 })}$`, {transition: Flip, autoClose: 1500, theme: "colored", position: "bottom-right"});
    return "WIN!!";
    
  }