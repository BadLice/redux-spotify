import { createSlice } from '@reduxjs/toolkit';
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

const initialState = {
	index: null,
	queue: null,
	isPlaying: false,
	shuffle: false,
	repeat: false,
	alreadyPlayed: null,
};
const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		next(state) {
			if (state.queue) {
				if (state.shuffle) {
					let precIndex = state.index;
					do {
						state.index = getRandomInt(state.queue.length);
						console.log(state.index);
					} while (
						!state.queue[state.index].url
						// ||
						// state.alreadyPlayed.indexOf(
						// 	state.queue[state.index].url
						// ) !== -1 ||
						// state.alreadyPlayed.length <
						// 	state.queue.filter(({ url }) => !!url).length
					);

					if (
						state.alreadyPlayed.indexOf(
							state.queue[precIndex].url
						) === -1
					) {
						state.alreadyPlayed.push(state.queue[precIndex].url);
					}
				} else {
					do {
						state.index++;
					} while (
						!state.queue[state.index].url &&
						state.index < state.queue.length
					);

					if (state.index >= state.queue.length) {
						state.isPlaying = false;
						state.index = null;
						state.queue = null;
						state.alreadyPlayed = null;
					}
				}
			}
		},
		previous(state) {
			if (state.queue) {
				do {
					state.index--;
				} while (!state.queue[state.index].url && state.index >= 0);

				if (state.index < 0) {
					state.isPlaying = false;
					state.index = null;
					state.queue = null;
					state.alreadyPlayed = null;
				}
			}
		},
		setIndex(state, { payload }) {
			state.index = payload.index;
		},
		play(state, { payload }) {
			if (!payload) {
				state.isPlaying = true;
			} else {
				if (payload) {
					state.index = payload.index ?? 0;
					state.queue = payload.queue;
					state.isPlaying = true;
					state.alreadyPlayed = [];
				}
			}
		},
		pause(state) {
			state.isPlaying = false;
		},
		toggleShuffle(state) {
			state.shuffle = !state.shuffle;
		},
		toggleRepeat(state) {
			state.repeat = !state.repeat;
		},
	},
});

const playerActions = playerSlice.actions;
export { playerActions };
export default playerSlice;
