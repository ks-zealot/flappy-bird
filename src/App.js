import React from 'react'
import classnames from 'classnames'
import Bird from './components/Bird'
import Piping from './components/Piping'
import Menu from './components/Menu'
import flbr from './images/flbr.png'
import axios from 'axios'
import {useEffect, useState} from 'react'
import AdminScreen from "./AdminScreen";

export default function App({state, actions, record}) {
    let {bird, pipings, game, player} = state
    let {FLY_UP, START_PLAY} = actions
    let recordState = record.getRecord()
    let {isRecording, history} = recordState
    let isPlaying = game.status === 'playing'
    let onFlyUp = isPlaying && !isRecording && FLY_UP
    let onReplay = history.length > 0 && record.replay
    let [users, setUsers] = useState([])
    let [currentUser, setCurrentUser] = useState('')

    const showAdmin = () => {
        if (window.location.pathname === "/admin") {
            return <AdminScreen/>
        }
    }
    const showGame = () => {
        if (window.location.pathname !== "/admin") {
            return <div className="game">

                <div style={s} className="scene" id={"leaderboard"}>
                    <div className="menu c-wrap">
                        <div className={"c-inner"}>
                            <div className={"position_container"}> Leaderboard</div>
                            <div className={"position_container"}>Place Name Score</div>
                            <div className={"list_container"}>
                                <ol>{users.map(user => <li>{user.name} {user.score}</li>)}</ol>
                            </div>
                            <div className={"position_container"}>Your score is {currentUser.score}, your place
                                is {currentUser.position}</div>
                            <br/>
                            <div className="btn position_container" onMouseDown={returnToMainScreen}
                                 onTouchStart={returnToMainScreen}>Return
                            </div>
                        </div>
                    </div>
                </div>
                <div id={"scene"} className="scene" onMouseDown={onFlyUp} onTouchStart={onFlyUp}>
                    {isPlaying &&
                        <div className="score">{player.score}</div>
                    }
                    <Bird {...bird} isFlying={isPlaying}/>
                    {
                        pipings.list.map(piping => <Piping key={piping.timestamp} {...piping} />)
                    }
                    <div className={landClasses}/>
                    {game.status === 'over' &&
                        <Menu score={player.score} onPlay={START_PLAY} onReplay={onReplay}
                              showLeaderboard={showLeaderboard}
                              onReverse={record.reverse}/>
                    }
                </div>
            </div>
        }
    }


    useEffect(() => {
        axios.get('https://visgame.xyz/users/flappy_bird').then(result => {
            setUsers(result.data)
        })
        /*global Telegram */
        const id = Telegram.WebApp.initDataUnsafe.user ? Telegram.WebApp.initDataUnsafe.user.id : '1984577198'
        const firstName = Telegram.WebApp.initDataUnsafe.user ? Telegram.WebApp.initDataUnsafe.user.first_name : 'Test'
        axios.get('https://visgame.xyz/user/flappy_bird/' + id).then(result => {
            setCurrentUser(result.data)
        }).catch((error) => {
            setCurrentUser({id: id, name: firstName, score: 0})
        });
        axios.post('https://visgame.xyz/user/enter/flappy_bird', {id : id}).catch(() => {});
    }, []);

    let showLeaderboard = () => {
        document.getElementById('scene').style.display = 'none'
        document.getElementById('leaderboard').style.display = 'block'
        axios.get('https://visgame.xyz/users/flappy_bird').then(result => {
            setUsers(result.data)
        })
        /*global Telegram */
        const id = Telegram.WebApp.initDataUnsafe.user ? Telegram.WebApp.initDataUnsafe.user.id : '1984577198'
        const firstName = Telegram.WebApp.initDataUnsafe.user ? Telegram.WebApp.initDataUnsafe.user.first_name : 'Test'
        axios.get('https://visgame.xyz/user/flappy_bird/' + id).then(result => {
            setCurrentUser(result.data)
            document.getElementById('scene').style.display = 'none'
            document.getElementById('leaderboard').style.display = 'block'
        }).catch((error) => {
            setCurrentUser({id: id, name: firstName, score: 0})
        });
    }
    let returnToMainScreen = () => {
        document.getElementById('scene').style.display = 'block'
        document.getElementById('leaderboard').style.display = 'none'
    }
    let landClasses = classnames({
        land: true,
        sliding: isPlaying,
    })
    if (window.location.hash.slice(1).includes('tdesktop') || window.location.hash.slice(1).includes('macos')) {
        let style = {position: `fixed`, top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}

        return <div style={style}>
            <img src={flbr}/>
        </div>
    }
    let s = {display: `none`}
    return (
        <div>
            {showAdmin()}
            {showGame()}
        </div>
    )
}