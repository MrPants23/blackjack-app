import React from 'react';
import Card from './Card';
import './Player.css';

const Player = (props) => {
    return (
        <div className='player'>
            <h1>Player Hand</h1>
            <h2>Shown Cards Value: {props.playerHandSum}</h2>
            <div className='player-hand'>
                {props.playerHand.map((card, i) => {
                    return <Card 
                        key={i} 
                        id={card.id} 
                        suit={card.suit} 
                        type={card.type} 
                        name={card.name} 
                        value={card.value} 
                        imgSrc={card.imgSrc} />
                })}
            </div>
            <div className='player-actions'>
                <button onClick={() => props.playerDrawCard(1)}>Hit Me</button>
                <button onClick={() => props.playerStand()}>Stand</button> 
            </div>
        </div>
    );
}

export default Player;