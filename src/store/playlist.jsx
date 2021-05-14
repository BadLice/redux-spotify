import { createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';
import apiRequest from '../api/api.request';

const initialState = { data: null };
const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		setPlaylist(state, { payload }) {
			state.data = payload;
		},
	},
});

const fetchPlaylist = (token, id) => {
	return async (dispatch) => {
		try {
			let { data } = await apiRequest(
				dispatch,
				'get',
				`https://api.spotify.com/v1/playlists/${id}?market=IT&access_token=${token}`
			);
			dispatch(playlistActions.setPlaylist(data));
		} catch (error) {
			notification.error({
				message: 'Error',
				description: 'Cannot fetch playlist data',
				placement: 'bottomRight',
			});
		}
	};
};

const playlistActions = playlistSlice.actions;
export { playlistActions, fetchPlaylist };
export default playlistSlice;
