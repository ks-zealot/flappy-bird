import React from 'react'
import classnames from 'classnames'
import Bird from './components/Bird'
import Piping from './components/Piping'
import Menu from './components/Menu'
import flbr from './images/flbr.png'

export default function App({state, actions, record}) {
    let {bird, pipings, game, player} = state
    let {FLY_UP, START_PLAY} = actions
    let recordState = record.getRecord()
    let {isRecording, history} = recordState
    let isPlaying = game.status === 'playing'
    let onFlyUp = isPlaying && !isRecording && FLY_UP
    let onReplay = history.length > 0 && record.replay
    let showLeaderboard = () => {
        document.getElementById('scene').style.display = 'none'
        document.getElementById('leaderboard').style.display = 'block'

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

        <div className="game">
            <div  style={s}  id={"leaderboard"}>
                Leaderboard
                <div className="btn" onMouseDown={returnToMainScreen} onTouchStart={returnToMainScreen}>Return</div>
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
                    <Menu score={player.score} onPlay={START_PLAY} onReplay={onReplay} showLeaderboard={showLeaderboard}
                          onReverse={record.reverse}/>
                }
            </div>
        </div>
    )
}