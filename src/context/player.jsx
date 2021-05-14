import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playerActions } from '../store/player';

const usePlayer = () => {
	const dispatch = useDispatch();
	const queue = useSelector((state) => state.player.queue);
	const index = useSelector((state) => state.player.index);
	const isPlaying = useSelector((state) => state.player.isPlaying);
	const url = queue && index !== null ? queue[index] : null;

	const [audio, setAudio] = useState(null);
	const [analyzer, setAnalyzer] = useState(null);
	const [audioContext, setAudioContext] = useState(null);

	const initAudio = useCallback(() => {
		if (url) {
			const au = new Audio();
			au.crossOrigin = 'anonymous';
			const ac = new AudioContext();
			const source = ac.createMediaElementSource(au);
			const an = ac.createAnalyser();
			au.src = url;
			an.fftSize = 2 ** 6;
			source.connect(ac.destination);
			source.connect(an);
			setAudioContext(ac);
			setAudio(au);
			setAnalyzer(an);
		}
	}, [url]);

	const destroyAudio = useCallback(() => {
		if (audio) {
			audio.pause();
		}
		if (audioContext && audioContext.state !== 'closed') {
			audioContext.close();
		}
		setAudio(null);
		setAnalyzer(null);
	}, [audio, audioContext]);

	const next = useCallback(() => {
		dispatch(playerActions.next());
	}, [dispatch]);

	useEffect(() => {
		if (audio) {
			if (isPlaying) {
				if (audio.src !== url) {
					destroyAudio();
				} else {
					if (audio.paused) {
						audio.play();
					}
				}
			}
			if (!isPlaying) {
				audio.pause();
			}

			audio.addEventListener('ended', next);
			return () => audio.removeEventListener('ended', next);
		}

		if (!audio) {
			if (isPlaying) {
				initAudio();
			}
		}
	}, [audio, destroyAudio, initAudio, isPlaying, next, url]);

	return {
		isPlaying,
		audio,
		setAudio,
		analyzer,
		setAnalyzer,
		audioContext,
		setAudioContext,
		queue,
		index,
	};
};

export const PlayerContext = createContext();

export const PlayerProvider = (props) => {
	const player = usePlayer();

	return (
		<>
			<PlayerContext.Provider value={player}>
				{props.children}
			</PlayerContext.Provider>
		</>
	);
};
