import React, {useState, useEffect} from 'react';
import Card from './Card';
import './Dealer.css';
import CardBack from '../images/card_back.png';

const Dealer = (props) => {
    return (
        <>
            <h1>Dealer Hand</h1>
            <h2>Shown Cards Value: {props.dealerHandSum}</h2>
            <div className='dealer-hand'>
                {
                    props.dealerHand.map((card, i) => {
                    return <Card 
                        key={i}
                        id={card.id} 
                        suit={card.suit} 
                        type={card.type} 
                        name={card.name} 
                        value={card.value} 
                        imgSrc={card.isHidden ? CardBack : card.imgSrc} />
                })}
            </div>
        </>
    );
}

export default Dealer;