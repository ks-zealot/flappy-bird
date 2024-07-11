import React , { useState , useEffect} from 'react'

export default function Menu({ score, onPlay, onReplay, onReverse }) {
	const [username, setUsername] = useState('')
	useEffect(() => {
			/*global Telegram */
			if (Telegram.WebApp.initDataUnsafe.user) {
				const wb = Telegram.WebApp.initDataUnsafe.user
				setUsername(wb.first_name)
			} else {
				setUsername('Test')
			}
		}
	)
	return (
		<div className="menu c-wrap">
			<ul className="c-inner">
				<li>{username}, your score is: {score}</li>
				<li>
					<div className="btn" onMouseDown={onPlay} onTouchStart={onPlay}>play</div>
				</li>
				{ onReplay && 
					<li>
						<div className="btn" onMouseDown={onReplay} onTouchStart={onReplay}>replay</div>
					</li>
				}
				{ onReplay && 
					<li>
						<div className="btn" onMouseDown={onReverse} onTouchStart={onReverse}>reverse</div>
					</li>
				}
			</ul>
		</div>
	)
}