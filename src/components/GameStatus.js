import React from 'react';

const GameStatus = (props) => {
    return (
        <div className='game-status'>
            {(() => {
                switch (props.gameStatus) {
                    case 'player_bust': {
                        return (
                            <div>
                                Too bad... you busted!
                            </div>
                        );
                    }
                    case 'player_win':
                    case 'dealer_bust': {
                        return (
                            <div>
                                YOU WON PLAYER!!! CONGRATULATIONS!
                            </div>
                        );
                    }
                    case 'dealer_win': {
                        return (
                            <div>
                                Too bad... luck was not on your side this time!
                            </div>
                        );
                    }
                }
            })()}
            <button onClick={() => props.resetGame()}>Play Again?</button>
        </div>
    );
}

export default GameStatus;