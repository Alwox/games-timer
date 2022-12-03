import React from 'react';
import {Timer} from "./Timer";

import {useLocalStorage} from "./useLocalStorage";

const version = require('../package.json')

type Views = 'selectPlayer' | 'timer'
type PlayerColor = 'red' | 'blue' | 'green' | 'yellow' | 'pink' | 'white'
type PlayerNumber = 1 | 2 | 3 | 4 | 5 | 6

export interface Player {
    name: string
    color: PlayerColor
    number: PlayerNumber
}

function App() {
    const [view, setView] = React.useState<Views>('selectPlayer')
    const [moveTime, setMoveTime] = useLocalStorage('time', 60)
    const [players, setPlayers] = useLocalStorage<Player[]>('players', [])
    const [playerName, setPlayerName] = React.useState('')

    const handleAddPlayer = () => {
        let freeNumber: PlayerNumber = 1

        const numbers: PlayerNumber[] = [1, 2, 3, 4, 5, 6]

        numbers.forEach((number: PlayerNumber) => {
            if (players.find(player => player.number === number)) {
                return
            } else {
                freeNumber = number
            }
        })


        setPlayers([...players, {
            name: playerName,
            color: 'blue',
            number: freeNumber
        }])
        setPlayerName('')
    }

    const handleColorChange = (e: any, number: PlayerNumber) => {
        const updatedPlayers = [...players]
        const playerToUpdate = updatedPlayers.find(p => p.number === number)

        if (playerToUpdate) {
            playerToUpdate.color = e.target.value
        }

        setPlayers(updatedPlayers)

    }

    const handleRemovePLayer = (number: PlayerNumber) => {
        const newPlayers = players.filter(p => p.number !== number)
        setPlayers(newPlayers)
    }

    const handleChangeTime = (e: any) => {
        const newTime = Number(e.target.value)
        setMoveTime(newTime < 5 ? 5 : newTime)
    }

    return (
        <div className="app">
            {view === 'selectPlayer' && (
                <div className='selectPlayer-view'>
                    <h1>Games Timer <span className='version-number'>v {version.version}</span></h1>
                    <p style={{marginBottom: 12}}>Gracze</p>
                    {players.map((player, index) => (
                        <div className='player'>
                            <span className='number'>{index + 1}</span>
                            <span className='name'>{player.name}</span>
                            <div>
                                <select value={player.color} onChange={(e) => handleColorChange(e, player.number)}>
                                    <option value='blue'>Niebieski</option>
                                    <option value='red'>Czerwony</option>
                                    <option value='green'>Zielony</option>
                                    <option value='pink'>Różowy</option>
                                    <option value='white'>Biały</option>
                                    <option value='yellow'>Żółty</option>
                                </select>
                                <button className='deleteButton' onClick={() => handleRemovePLayer(player.number)}>Usuń</button>
                            </div>
                        </div>
                    ))}
                    {
                        players.length < 6 && (
                            <div style={{marginBottom: 8}}>
                                <p>Dodaj gracza</p>
                                <input maxLength={12} value={playerName} onChange={(e) => setPlayerName(e.target.value)}/>

                                <button style={{marginLeft: 8}} onClick={handleAddPlayer}>Dodaj</button>
                            </div>
                        )
                    }


                    <p>Czas na ruch (s)</p>
                    <input min={5} max={600} type='number' value={moveTime} onChange={handleChangeTime}/>

                    <button style={{marginLeft: 8}} disabled={players.length < 2} onClick={() => setView('timer')}>Start</button>
                </div>
            )}

            {view === 'timer' && (
                <Timer defaultSeconds={moveTime} players={players} onClose={() => setView('selectPlayer')}/>
            )}
        </div>
    );
}

export default App;
