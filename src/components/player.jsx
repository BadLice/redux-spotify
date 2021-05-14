import {
	CaretRightOutlined,
	PauseOutlined,
	StepBackwardOutlined,
	StepForwardOutlined,
} from '@ant-design/icons';
import { Affix, Button, Slider } from 'antd';
import React, {
	memo,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { PlayerContext } from '../context/player';

const durationToMinutesStr = (duration) => {
	if (duration === 0 || isNaN(duration)) {
		return '0.00';
	}
	let minutes = parseInt(duration / 60, 10);
	let seconds = parseInt(duration % 60);

	if (minutes < 10) {
		minutes += '0';
	}

	return `${minutes}.${seconds}`;
};

const Player = () => {
	const { isPlaying, audio, analyzer, play, pause, next, previous } =
		useContext(PlayerContext);
	const [progress, setProgress] = useState(0);
	const shuffler = useMemo(
		() => [
			9, 7, 21, 11, 25, 13, 14, 4, 10, 26, 6, 16, 15, 3, 5, 23, 8, 22, 17,
			18, 20, 24, 12, 27, 19,
		],
		[]
	);

	const setStyle = useCallback(
		(arr, reset) => {
			if (reset) {
				arr = new Uint8Array(31).fill(0);
			}
			const elements = document.getElementsByClassName('spectrum-item');

			for (let i = 0; i < elements.length; i++) {
				elements[i].style.height =
					((arr[shuffler[i]] * 80) / 255 || 1) + 'px';
				if (reset) {
					elements[i].className = 'spectrum-item spectrum-item-reset';
				} else {
					elements[i].className = 'spectrum-item';
				}
			}
		},
		[shuffler]
	);

	const clearSpectrum = useCallback(() => {
		setStyle(null, true);
	}, [setStyle]);

	const runSpectrum = useCallback(() => {
		if (audio) {
			const bufferLength = analyzer.frequencyBinCount;
			const amplitudeArray = new Uint8Array(bufferLength);
			analyzer.getByteFrequencyData(amplitudeArray);
			setStyle(amplitudeArray);
			if (!audio.paused) {
				requestAnimationFrame(runSpectrum);
			}
		}
	}, [analyzer, audio, setStyle]);

	useEffect(() => {
		if (isPlaying) {
			requestAnimationFrame(runSpectrum);
		} else {
			requestAnimationFrame(clearSpectrum);
		}
	}, [clearSpectrum, isPlaying, runSpectrum]);

	const updateProgress = useCallback(() => {
		if (audio) {
			setProgress((audio.currentTime / audio.duration) * 100);
		}
	}, [audio]);

	const handleChangeProgress = (value) => {
		if (audio) {
			audio.currentTime = (value * audio.duration) / 100;
		} else {
			audio.currentTime = 0;
		}
	};

	const handlePlay = useCallback(() => {
		if (isPlaying) {
			pause();
		} else {
			play();
		}
	}, [isPlaying, pause, play]);

	const handleNext = useCallback(() => {
		next();
	}, [next]);

	const handlePrevious = useCallback(() => {
		previous();
	}, [previous]);

	useEffect(() => {
		if (audio) {
			audio.addEventListener('timeupdate', updateProgress);
			return () =>
				audio.removeEventListener('timeupdate', updateProgress);
		}
		if (!audio) {
			setProgress(0);
		}
	}, [audio, updateProgress]);

	return (
		<Affix offsetBottom={0}>
			<div className='player'>
				<div className='spectrum'>
					{[...new Array(31 - 6)].map((_, index) => (
						<div key={index + 3} className={'spectrum-item'} />
					))}
				</div>
				<div className='commands'>
					<Button
						ghost
						shape='circle'
						icon={<StepBackwardOutlined />}
						onClick={handlePrevious}
					/>
					<Button
						ghost
						shape='circle'
						icon={
							isPlaying ? (
								<PauseOutlined />
							) : (
								<CaretRightOutlined />
							)
						}
						className='play'
						onClick={handlePlay}
					/>
					<Button
						ghost
						shape='circle'
						icon={<StepForwardOutlined />}
						onClick={handleNext}
					/>
				</div>
				<div className='progress'>
					<Slider
						onChange={handleChangeProgress}
						value={progress}
						className='progress-slider'
						tooltipVisible={false}
						marks={{
							0: {
								style: { color: 'white' },
								label: '0.00',
							},
							100: {
								style: { color: 'white' },
								label: durationToMinutesStr(
									audio ? audio.duration : 0
								),
							},
						}}
					/>
				</div>
			</div>
		</Affix>
	);
};

export default memo(Player);
