import React, { useState, useEffect } from 'react';
import './App.css';
import Deck from './data/deck.json'
import Dealer from './components/Dealer';
import Player from './components/Player';
import { nanoid } from 'nanoid';
import GameStatus from './components/GameStatus';

const visualDeck = Deck.map((card, i) => {
  return {
    id: nanoid(),
    suit: card.suit,
    type: card.type,
    name: card.name,
    value: Number(card.value),
    imgSrc: require("" + `./images/${card.name}_of_${card.suit}.png`),
    isHidden: false,
  }
});
const MAX_DECK_SIZE = visualDeck.length;
const DEALER_SOFT_STAND = 18;
const GAME_TICK = 1000;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const App = () => {
  const [deck, setDeck] = useState(visualDeck);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerHandSum, setDealerHandSum] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerHandSum, setPlayerHandSum] = useState(0);
  const [dealerHitTick, setDealerHitTick] = useState(0);
  const [gameStatus, setGameStatus] = useState(null); // '', 'player_bust', 'dealer_bust', 'player_win', 'dealer_win' 

  // Start the Game by drawing 4 cards from the deck and splitting those four between the player and the dealer (2 and 2)
  useEffect(() => {
    setUpNewGame();
  }, [])

  // Whenever the player's hand changes, calculate the new sum of their hand
  useEffect(() => {
    let newPlayerHandSum = playerHandSum;
    newPlayerHandSum = sumHandValue(playerHand);
    setPlayerHandSum(newPlayerHandSum);
    if(newPlayerHandSum > 21) {
      setGameStatus('player_bust');
    }
  }, [playerHand]);

  // Whenever the dealer's hand changes, calculate the new sum of their hand
  useEffect(() => {
    let newDealerHandSum = dealerHandSum;
    newDealerHandSum = sumHandValue(dealerHand);
    setDealerHandSum(newDealerHandSum);
    if(newDealerHandSum > 21) {
      setGameStatus('dealer_bust');
    }
  }, [dealerHand]);

  useEffect(() => {
    if(dealerHitTick <= 0) return;
    if (dealerHandSum < DEALER_SOFT_STAND) {
      dealerDrawCard(1);
    }
    else if (dealerHandSum <= 21) {
      if (dealerHandSum >= playerHandSum)
        setGameStatus('dealer_win');
      else
        setGameStatus('player_win');
    }
  }, [dealerHitTick])

  const drawCards = (numCards) => {
    let cards = [];
    for (let x = 0; x < numCards; x++) {
      cards.push(deck[getRandomInt(0, MAX_DECK_SIZE - 1)]);
    }

    // After drawing from the deck, remove the cards drawn to prevent duplicates
    setDeck(deck.filter((card) => {
      return cards.id !== card.id
    }));

    return cards;
  }

  const playerDrawCard = (numCards) => {
    let newPlayerHand = playerHand;
    newPlayerHand = newPlayerHand.concat(drawCards(numCards));
    setPlayerHand(newPlayerHand);
  }

  const sumHandValue = (hand) => {
    let handValue = 0;
    let isAcePresent = hand.includes(x => x.type === 'special');
    for (let x = 0; x < hand.length; x++) {
      handValue += !hand[x].isHidden ? hand[x].value : 0;
    }
    if (handValue > 21 && isAcePresent) {
      handValue -= 10;
    }
    return handValue;
  }

  const dealerDrawCard = (numCards) => {
    let newDealerHand = dealerHand;
    newDealerHand = newDealerHand.concat(drawCards(numCards));
    setDealerHand(newDealerHand);
  }

  const playerStand = () => {
    dealerHand.forEach(x => x.isHidden = false); // Reveal the dealers hand once the player stands
    const timerId = setTimeout(() => {
      setDealerHitTick(dealerHitTick + 1);
    }, GAME_TICK);
    return () => clearTimeout(timerId);
  }

  const resetGame = () => {
    setDeck(visualDeck);
    setDealerHand([]);
    setDealerHandSum(0);
    setPlayerHand([]);
    setPlayerHandSum(0);
    setDealerHitTick(0);
    setGameStatus(null); 
    while(deck.length < MAX_DECK_SIZE) {}
    setUpNewGame();
  }

  const setUpNewGame = () => {
    let cards = drawCards(4);
    cards[0].isHidden = true; // Hide one of the dealers cards from the player
    setDealerHand(cards.splice(0, 2));
    setPlayerHand(cards.splice(0, 2));
  }

  return (
    <div className="App">
      {gameStatus !== null ? <GameStatus gameStatus={gameStatus} resetGame={resetGame} /> : null}
      <Dealer dealerHand={dealerHand} dealerHandSum={dealerHandSum} />
      <Player playerHand={playerHand} playerDrawCard={playerDrawCard} playerHandSum={playerHandSum} playerStand={playerStand} />
    </div>
  );
}

export default App;