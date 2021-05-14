import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { PlayerContext } from '../context/player';
import { playerActions } from '../store/player';

const Audio = ({ renderPlay, renderPause, index, queue, ...rest }) => {
	const dispatch = useDispatch();
	const { isPlaying: playerIsPlaying, url: playerUrl } =
		useContext(PlayerContext);

	const url = queue[index].url;
	const iAmInPlayer = playerUrl ? playerUrl === url : false;

	const handlePlay = () => {
		if (iAmInPlayer && playerIsPlaying) {
			dispatch(playerActions.pause());
		} else {
			dispatch(playerActions.play({ queue, index }));
		}
	};

	return (
		<>
			{/* this should be a button */}
			{React.Children.toArray(
				iAmInPlayer && playerIsPlaying ? renderPause : renderPlay
			).map((child) =>
				React.cloneElement(child, {
					onClick: handlePlay,
					disabled: !url,
					...rest,
				})
			)}
		</>
	);
};

export default Audio;
