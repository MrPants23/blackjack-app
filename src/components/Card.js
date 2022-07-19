import React from 'react';
import './Card.css'

const Card = (props) => {
    return (
        <div className='card'>
            <span className='card-description'>{`Card Suit: ${props.suit} -- Card Type: ${props.type} -- Card Name: ${props.name} -- Card Value: ${props.value}`}</span>
            <img src={props.imgSrc}></img>
        </div>
    )
}

export default Card;