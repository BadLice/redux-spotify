import { createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';
import apiRequest from '../api/api.request';

const initialState = { artists: null };
const userArtistsSlice = createSlice({
	name: 'userArtists',
	initialState,
	reducers: {
		setArtists(state, { payload }) {
			state.artists = payload;
		},
	},
});

const fetchUserArtists = (token, limit, after) => {
	return async (dispatch) => {
		try {
			let { data } = await apiRequest(
				dispatch,
				'get',
				`https://api.spotify.com/v1/me/following?type=artist&limit=${
					limit ?? 7
				}&access_token=${token}&after=${after ?? '%20'}`
			);
			dispatch(userArtistsActions.setArtists(data.artists.items));
		} catch (error) {
			notification.error({
				message: 'Error',
				description: 'Cannot fetch user followed artists',
				placement: 'bottomRight',
			});
		}
	};
};

const userArtistsActions = userArtistsSlice.actions;
export { userArtistsActions, fetchUserArtists };
export default userArtistsSlice;
