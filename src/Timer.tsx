import {useState, useEffect} from "react";

interface Player {
    name: string
    color: string
}

interface Props {
    defaultSeconds: number
    players: Player[]
}

export const Timer = ({defaultSeconds, players}: Props) => {
    const [secondsLeft, setSecondsLeft] = useState(defaultSeconds)
    const [currentPlayer, setCurrentPlayer] = useState(0)

    useEffect(() => {
            const interval = setInterval(() => setSecondsLeft(secondsLeft === 0 ? defaultSeconds : secondsLeft - 1), 1000);

            return () => clearInterval(interval);
        }, [secondsLeft]);


    const handleResetTime = () => {
        setSecondsLeft(defaultSeconds)
        const nextPlayer = currentPlayer === (players.length - 1) ? 0 : currentPlayer + 1
        setCurrentPlayer(nextPlayer)
    }

    return (
        <div className={players[currentPlayer].color} onClick={handleResetTime}>
            <h2>{players[currentPlayer].name}</h2>
            <h1>{secondsLeft}</h1>
        </div>
    )
}