import { createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';
import apiRequest from '../api/api.request';

const initialState = { token: null, user: null };
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken(state, { payload: hash }) {
			let token = null;
			const start = hash.indexOf('access_token=');
			const end = hash.indexOf('&token_type');
			const padding = 'access_token='.length;
			if (start !== -1 && end !== -1) {
				token = hash.substring(start + padding, end);
			}

			if (!token) {
				//try to retrieve token from sessionStorage
				token = sessionStorage.getItem('spty_token') ?? null;
			}

			if (token) {
				sessionStorage.setItem('spty_token', token);
			}

			state.token = token;
		},
		setUser(state, { payload: user }) {
			state.user = user;
		},
		logout(state) {
			state.token = null;
			state.user = null;
			sessionStorage.removeItem('spty_token');
		},
	},
});

const fetchUser = (token) => {
	return async (dispatch) => {
		try {
			let { data } = await apiRequest(
				dispatch,
				'get',
				`https://api.spotify.com/v1/me?access_token=${token}`
			);
			dispatch(authActions.setUser(data));
		} catch (error) {
			notification.error({
				message: 'Error',
				description: 'Cannot fetch user profile data',
				placement: 'bottomRight',
			});
		}
	};
};

const authActions = authSlice.actions;

export { authActions, fetchUser };

export default authSlice;
