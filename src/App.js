import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import PlayList from './components/playlist';
import UserHome from './components/user.home';
import UserPlaylists from './components/user.playlists';
import { authActions, fetchUser } from './store/auth';

function App() {
	const location = useLocation();
	const dispatch = useDispatch();

	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (!token) {
			dispatch(authActions.setToken(location.hash));
		}
		if (token) {
			if (!user) {
				dispatch(fetchUser(token));
			}
		}
	}, [dispatch, location.hash, token, user]);

	return (
		<Switch>
			<Route exact path='/'>
				{token ? <UserHome /> : <Home />}
			</Route>
			<Route exact path='/playlist/:id'>
				<PlayList />
			</Route>
			<Route exact path='/user/playlists/:pageNumber'>
				<UserPlaylists />
			</Route>
			<Route path='*'>404 Not found</Route>
		</Switch>
	);
}

export default App;
