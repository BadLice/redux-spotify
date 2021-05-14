import { createSlice } from '@reduxjs/toolkit';

const initialState = { index: null, queue: null, isPlaying: false };
const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		next(state) {
			if (state.queue) {
				do {
					state.index++;
				} while (
					!state.queue[state.index] &&
					state.index < state.queue.length
				);

				if (state.index >= state.queue.length) {
					state.isPlaying = false;
					state.index = null;
					state.queue = null;
				}
			}
		},
		previous(state) {
			if (state.queue && state.index > 0) {
				state.index--;
			}
		},
		setIndex(state, { payload }) {
			state.index = payload.index;
		},
		play(state, { payload }) {
			state.index = payload.index ?? 0;
			state.queue = payload.queue;
			state.isPlaying = true;
		},
		pause(state, { payload }) {
			state.isPlaying = false;
		},
	},
});

const playerActions = playerSlice.actions;
export { playerActions };
export default playerSlice;
