import { createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';
import apiRequest from '../api/api.request';

const initialState = {
	playlists: null,
	total: null,
	preview: null,
	setCreateResult: { success: false, error: false },
	editResult: { success: false, error: false },
};
const userPlaylistsSlice = createSlice({
	name: 'userPlaylists',
	initialState,
	reducers: {
		setPlaylists(state, { payload }) {
			state.playlists = payload;
		},
		setTotal(state, { payload }) {
			state.total = payload;
		},
		setPreview(state, { payload }) {
			state.preview = payload;
		},
		setCreateResult(state, { payload }) {
			state.createSuccess = payload.success;
			state.createError = payload.error;
		},
		setEditResult(state, { payload }) {
			state.editResult.success = payload.success;
			state.editResult.errror = payload.error;
		},
	},
});

const fetchUserPlaylists = (token, limit, offset) => {
	return async (dispatch) => {
		try {
			let { data } = await apiRequest(
				dispatch,
				'get',
				`https://api.spotify.com/v1/me/playlists?offset=${
					offset ?? 0
				}&limit=${limit ?? 7}&access_token=${token}`
			);
			dispatch(userPlaylistsActions.setPlaylists(data.items));
			dispatch(userPlaylistsActions.setTotal(data.total));
		} catch (error) {
			notification.error({
				message: 'Error',
				description: 'Cannot fetch user playlists',
				placement: 'bottomRight',
			});
		}
	};
};

const fetchUserPlaylistsPreview = (token) => {
	return async (dispatch) => {
		try {
			let { data } = await apiRequest(
				dispatch,
				'get',
				`https://api.spotify.com/v1/me/playlists?offset=${0}&limit=${7}&access_token=${token}`
			);

			dispatch(userPlaylistsActions.setPreview(data.items));
			dispatch(userPlaylistsActions.setTotal(data.total));
		} catch (error) {
			notification.error({
				message: 'Error',
				description: 'Cannot fetch user playlists',
				placement: 'bottomRight',
			});
		}
	};
};

const createPlaylist = ({ token, userId, name, description, xpublic }) => {
	return async (dispatch) => {
		try {
			dispatch(
				userPlaylistsActions.setCreateResult({
					success: false,
					error: false,
				})
			);

			const { data } = await apiRequest(
				dispatch,
				'post',
				`https://api.spotify.com/v1/users/${userId}/playlists?access_token=${token}`,
				{
					name,
					description,
					public: xpublic,
				}
			);
			dispatch(
				userPlaylistsActions.setCreateResult({
					success: data,
					error: false,
				})
			);
		} catch (error) {
			dispatch(
				userPlaylistsActions.setCreateResult({
					success: false,
					error: true,
				})
			);

			notification.error({
				message: 'Error',
				description: 'An error occured while creating a new playlist',
				placement: 'bottomRight',
			});
		}
	};
};

const editPlaylist = ({ token, playlistId, name, description, xpublic }) => {
	return async (dispatch) => {
		try {
			dispatch(
				userPlaylistsActions.setEditResult({
					success: false,
					error: false,
				})
			);

			await apiRequest(
				dispatch,
				'put',
				`https://api.spotify.com/v1/playlists/${playlistId}?access_token=${token}`,
				{
					name,
					description,
					public: xpublic,
				}
			);
			dispatch(
				userPlaylistsActions.setEditResult({
					success: true,
					error: false,
				})
			);
		} catch (error) {
			dispatch(
				userPlaylistsActions.setEditResult({
					success: false,
					error: true,
				})
			);

			notification.error({
				message: 'Error',
				description: 'An error occured while editing a playlist',
				placement: 'bottomRight',
			});
		}
	};
};

const userPlaylistsActions = userPlaylistsSlice.actions;
export {
	userPlaylistsActions,
	fetchUserPlaylists,
	fetchUserPlaylistsPreview,
	createPlaylist,
	editPlaylist,
};
export default userPlaylistsSlice;
