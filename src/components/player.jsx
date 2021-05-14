import { Affix } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React, { memo, useCallback, useContext, useEffect } from 'react';
import { PlayerContext } from '../context/player';
const Player = () => {
	const { isPlaying, audio, analyzer } = useContext(PlayerContext);
	const shuffler = [
		30, 9, 7, 21, 11, 4, 13, 14, 28, 1, 25, 10, 19, 6, 16, 15, 29, 3, 5, 23,
		0, 8, 2, 22, 17, 18, 20, 24, 12, 27, 26,
	];

	const setStyle = useCallback((arr, reset) => {
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
	}, []);

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

	return (
		<Affix offsetBottom={0}>
			<Footer className='footer'>
				{[...new Array(31)].map((_, index) => (
					<div key={index} className={'spectrum-item'} />
				))}
			</Footer>
		</Affix>
	);
};

export default memo(Player);
