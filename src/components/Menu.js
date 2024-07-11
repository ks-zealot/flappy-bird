import React   from 'react'

export default function Menu({ score, onPlay, onReplay, onReverse }) {
	/*global Telegram */
	const username  = Telegram.WebApp.initDataUnsafe.user ?   Telegram.WebApp.initDataUnsafe.user.first_name : 'Test'
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