import {useState, useEffect, useCallback} from "react";
import useSound from 'use-sound';

import beep1 from './sounds/beep-1.mp3';
import tick from './sounds/tick.mp3';
import {Player} from "./App";

import CloseIcon from './close.svg';

interface Props {
    defaultSeconds: number
    players: Player[]
    onClose: () => void
}

export const Timer = ({defaultSeconds, players, onClose}: Props) => {
    const [secondsLeft, setSecondsLeft] = useState(defaultSeconds)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [playBeep1] = useSound(beep1);
    const [playTick, {stop: stopTick}] = useSound(tick);

    const handleResetTime = useCallback(() => {
        if (secondsLeft + 1 >= defaultSeconds) {
            return
        }
        playBeep1()
        setSecondsLeft(defaultSeconds)
        const nextPlayer = currentPlayer === (players.length - 1) ? 0 : currentPlayer + 1
        setCurrentPlayer(nextPlayer)
    }, [currentPlayer, defaultSeconds, playBeep1, players.length, secondsLeft])

    useEffect(() => {
        if (secondsLeft <= 5) {
            playTick()
        }
        const interval = setInterval(() => {
            stopTick()
            if (secondsLeft === 0) {
                handleResetTime()
            } else {
                setSecondsLeft(secondsLeft - 1)
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [defaultSeconds, handleResetTime, playTick, secondsLeft, stopTick]);

    const player = players[currentPlayer]

    return (
        <div className={`timer-view ${player.color}`} onClick={handleResetTime}>
            <p className='player-name'>{player.name}</p>
            <p className='timer'>{secondsLeft}</p>
            <button className="closeButton" onClick={onClose}><img width={32} height={32} src={CloseIcon} alt="" /></button>
        </div>
    )
}